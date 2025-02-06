'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Location } from '@/data/locations';

interface VoteButtonProps {
  location: Location;
  userId?: string;
  className?: string;
}

export default function VoteButton({ location, userId, className = '' }: VoteButtonProps) {
  const storageKey = `voted_${location.id}`;
  const [isVoting, setIsVoting] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(location.votes || 0);
  const [localHasVoted, setLocalHasVoted] = useState(false);

  // Initialize vote state from Firebase data
  useEffect(() => {
    const hasVotedFromFirebase = location.votedBy?.includes(userId || '') ?? false;
    if (hasVotedFromFirebase) {
      localStorage.setItem(storageKey, 'true');
    } else {
      localStorage.removeItem(storageKey);
    }
    setLocalHasVoted(hasVotedFromFirebase);
  }, [location.votedBy, userId, storageKey]);

  const handleVote = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isVoting) return;

      // Optimistically update UI
      const isAddingVote = !localHasVoted;
      setLocalHasVoted(isAddingVote);
      setLocalVoteCount((prev) => prev + (isAddingVote ? 1 : -1));

      // Update localStorage immediately
      if (isAddingVote) {
        localStorage.setItem(storageKey, 'true');
      } else {
        localStorage.removeItem(storageKey);
      }

      // Start background update
      setIsVoting(true);
      try {
        const locationRef = doc(db, 'locations', location.id);
        await updateDoc(locationRef, {
          votes: increment(isAddingVote ? 1 : -1),
          votedBy: isAddingVote
            ? arrayUnion(userId || 'anonymous')
            : arrayRemove(userId || 'anonymous'),
        });
      } catch (error) {
        // Revert optimistic updates on error
        setLocalHasVoted(!isAddingVote);
        setLocalVoteCount((prev) => prev + (isAddingVote ? -1 : 1));
        if (isAddingVote) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, 'true');
        }
        // eslint-disable-next-line no-console
        console.error('Error updating vote:', error);
      } finally {
        setIsVoting(false);
      }
    },
    [isVoting, localHasVoted, location.id, storageKey, userId]
  );

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`inline-flex items-center space-x-1 text-sm ${
        localHasVoted
          ? 'text-orange-600 hover:text-orange-700'
          : 'text-gray-500 hover:text-gray-600'
      } transition-colors ${className}`}
    >
      <ThumbsUp
        className={`h-4 w-4 ${localHasVoted ? 'fill-current' : ''} ${
          isVoting ? 'animate-pulse' : ''
        }`}
      />
      <span>{localVoteCount}</span>
    </button>
  );
}
