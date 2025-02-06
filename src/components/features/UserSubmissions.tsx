/* eslint-disable no-console */
'use client';

import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MapPin, Phone, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteButton from '@/components/ui/VoteButton';
import { LocationType } from '@/data/locations';

interface Location {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  fullAddress: string;
  contact?: {
    phone: string;
    phoneClickable: string;
  };
  website?: {
    url: string;
    label: string;
  };
  description?: string;
  submittedAt: any;
  suggestedBy: string;
  status: 'approved' | 'pending';
  source: 'suggestion' | 'static';
  votes: number;
  votedBy: string[];
  googleMapsUrl?: string;
}

const formatTimestamp = (timestamp: any) => {
  if (!timestamp) return '';

  try {
    // Handle Firestore Timestamp
    if (timestamp.toDate) {
      return formatDistanceToNow(timestamp.toDate(), {
        addSuffix: true,
      });
    }

    // Handle seconds timestamp
    if (timestamp.seconds) {
      return formatDistanceToNow(new Date(timestamp.seconds * 1000), {
        addSuffix: true,
      });
    }

    // Handle JavaScript Date object or ISO string
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return formatDistanceToNow(date, {
      addSuffix: true,
    });
  } catch (error) {
    console.error('Error formatting timestamp:', error, timestamp);
    return 'Recently';
  }
};

export default function UserSubmissions() {
  const [submissions, setSubmissions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function setupListener() {
      try {
        const q = query(
          collection(db, 'locations'),
          where('source', '==', 'suggestion'),
          orderBy('submittedAt', 'desc'),
          limit(50)
        );

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const newSubmissions = snapshot.docs
              .map((doc) => {
                const data = doc.data() as Location & {
                  status: 'approved' | 'pending';
                  source: 'suggestion' | 'static';
                };
                // Ensure submittedAt is properly handled
                const submittedAt = data.submittedAt?.toDate?.() || data.submittedAt;
                const { id: _, ...rest } = data;
                return {
                  id: doc.id,
                  ...rest,
                  submittedAt,
                };
              })
              .filter((submission) => submission.status === 'approved') as Location[];

            setSubmissions(newSubmissions);
            setLoading(false);
            setError(null);
          },
          (err) => {
            console.error('Error fetching submissions:', err);
            setError('Error fetching submissions');
            setLoading(false);
          }
        );
      } catch (err) {
        console.error('Error setting up submissions listener:', err);
        setError('Error setting up submissions listener');
        setLoading(false);
      }
    }

    setupListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Add scroll handler
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading recent submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No submissions yet. Be the first to suggest a location!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mobile scroll indicators */}
      <div className="md:hidden">
        {showLeftGradient && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-orange-50 to-transparent z-10" />
        )}
        {showRightGradient && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-orange-50 to-transparent z-10" />
        )}
      </div>

      {/* Submissions container - horizontal scroll on mobile, grid on desktop */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 -mb-4 md:mb-0 scrollbar-hide scroll-smooth"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="w-[55vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center md:snap-align-none first:ml-0 last:mr-4 md:first:ml-0 md:last:mr-0"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 h-full">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{submission.name}</h3>
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{submission.fullAddress}</span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    {submission.contact && submission.contact.phone && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{submission.contact.phone}</span>
                      </div>
                    )}

                    {submission.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        <a
                          href={submission.website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 truncate max-w-[120px]"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}

                    {(submission.type || submission.cuisine) && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {submission.type && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {submission.type}
                          </span>
                        )}
                        {submission.cuisine && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {submission.cuisine}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {submission.description && (
                    <div className="text-sm text-gray-600 italic line-clamp-2">
                      &ldquo;{submission.description}&rdquo;
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>Suggested by {submission.suggestedBy}</span>
                      <span>•</span>
                      <span>{formatTimestamp(submission.submittedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <VoteButton
                        location={{
                          id: submission.id,
                          name: submission.name,
                          type: submission.type.toLowerCase() as LocationType,
                          fullAddress: submission.fullAddress,
                          googleMapsUrl: submission.googleMapsUrl || '',
                          features: [],
                          priceRange: 'medium',
                          votes: submission.votes || 0,
                          votedBy: submission.votedBy || [],
                        }}
                      />
                      {submission.googleMapsUrl && (
                        <a
                          href={submission.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-orange-600 hover:text-orange-700"
                        >
                          View on Maps →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint for mobile */}
      <div className="mt-4 text-center text-sm text-gray-500 md:hidden">
        Swipe to see more suggestions →
      </div>
    </div>
  );
}
