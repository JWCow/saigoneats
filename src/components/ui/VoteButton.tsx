'use client';

import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Location } from '@/data/locations';

interface VoteButtonProps {
  location: Location;
  userId?: string; // We'll use this later for user authentication
  className?: string;
}

export default function VoteButton({ location, userId, className = '' }: VoteButtonProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [voteCount, setVoteCount] = useState(location.votes || 0);
  const [hasVoted, setHasVoted] = useState(location.votedBy?.includes(userId || '') || false);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when inside a Link component
    e.stopPropagation(); // Prevent event bubbling

    if (isVoting) return;

    // For now, we'll use a simple localStorage check to prevent multiple votes
    // In production, you should implement proper user authentication
    const storageKey = `voted_${location.id}`;
    const hasVotedBefore = localStorage.getItem(storageKey);

    if (hasVotedBefore && !userId) {
      return;
    }

    setIsVoting(true);

    try {
      const locationRef = doc(db, 'locations', location.id);
      
      if (!hasVoted) {
        // Add vote
        await updateDoc(locationRef, {
          votes: increment(1),
          votedBy: arrayUnion(userId || 'anonymous'),
        });
        setVoteCount((prev) => prev + 1);
        setHasVoted(true);
        localStorage.setItem(storageKey, 'true');
      } else if (userId) {
        // Remove vote (only for authenticated users)
        await updateDoc(locationRef, {
          votes: increment(-1),
          votedBy: arrayRemove(userId),
        });
        setVoteCount((prev) => prev - 1);
        setHasVoted(false);
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error('Error updating vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`inline-flex items-center space-x-1 text-sm ${
        hasVoted
          ? 'text-orange-600 hover:text-orange-700'
          : 'text-gray-500 hover:text-gray-600'
      } transition-colors ${className}`}
    >
      <ThumbsUp
        className={`h-4 w-4 ${hasVoted ? 'fill-current' : ''} ${
          isVoting ? 'animate-pulse' : ''
        }`}
      />
      <span>{voteCount}</span>
    </button>
  );
} 