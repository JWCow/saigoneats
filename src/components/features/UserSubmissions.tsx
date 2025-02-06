import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MapPin, Phone, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Submission {
  id: string;
  placeData: {
    name: string;
    address: string;
    phone: string | null;
    website: string | null;
    district?: string;
    googleMapsUrl: string | null;
  };
  userInput: {
    submitterName: string;
    category: string;
    cuisine: string | null;
    comments: string | null;
  };
  status: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const formatTimestamp = (timestamp: any) => {
  if (!timestamp) return '';

  // Handle Firestore Timestamp
  if (timestamp.seconds) {
    return formatDistanceToNow(new Date(timestamp.seconds * 1000), {
      addSuffix: true,
    });
  }

  // Handle JavaScript Date object (stored as ISO string)
  if (timestamp instanceof Date || typeof timestamp === 'string') {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
    });
  }

  return '';
};

export default function UserSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'), limit(5));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          try {
            const newSubmissions = snapshot.docs
              .map(
                (doc) =>
                  ({
                    id: doc.id,
                    ...doc.data(),
                  }) as Submission
              )
              .filter((submission) => submission.status === 'approved');

            setSubmissions(newSubmissions);
            setLoading(false);
            setError(null);
          } catch (err) {
            console.error('Error processing submissions:', err);
            setError('Error processing submissions data');
            setLoading(false);
          }
        },
        (err) => {
          console.error('Error fetching submissions:', err);
          setError('Error fetching submissions');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up submissions listener:', err);
      setError('Error setting up submissions listener');
      setLoading(false);
    }
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
            msOverflowStyle: 'none'
          }}
        >
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="w-[85vw] sm:w-[60vw] md:w-auto flex-shrink-0 snap-center md:snap-align-none first:ml-0 last:mr-4 md:first:ml-0 md:last:mr-0"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 h-full">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {submission.placeData.name}
                    </h3>
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{submission.placeData.address}</span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    {submission.placeData.phone && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{submission.placeData.phone}</span>
                      </div>
                    )}

                    {submission.placeData.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        <a
                          href={submission.placeData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 truncate max-w-[120px]"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}

                    {(submission.userInput.category || submission.userInput.cuisine) && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {submission.userInput.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {submission.userInput.category}
                          </span>
                        )}
                        {submission.userInput.cuisine && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {submission.userInput.cuisine}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {submission.userInput.comments && (
                    <div className="text-sm text-gray-600 italic line-clamp-2">
                      &ldquo;{submission.userInput.comments}&rdquo;
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>by {submission.userInput.submitterName}</span>
                      <span>•</span>
                      <span>{formatTimestamp(submission.createdAt)}</span>
                    </div>
                    {submission.placeData.googleMapsUrl && (
                      <a
                        href={submission.placeData.googleMapsUrl}
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
