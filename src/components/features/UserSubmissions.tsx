import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MapPin, Phone, User, Globe, Clock } from 'lucide-react';
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

export default function UserSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simplified query that doesn't require a composite index
      const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'), limit(5));

      // Set up real-time listener
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

            console.log('Fetched submissions:', newSubmissions); // Debug log
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

      // Cleanup subscription
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up submissions listener:', err);
      setError('Error setting up submissions listener');
      setLoading(false);
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
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">{submission.placeData.name}</h3>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(submission.createdAt.seconds * 1000), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{submission.placeData.address}</span>
            </div>

            {submission.placeData.phone && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{submission.placeData.phone}</span>
              </div>
            )}

            {submission.placeData.website && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <a
                  href={submission.placeData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700"
                >
                  Visit Website
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {submission.userInput.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  {submission.userInput.category}
                </span>
              )}
              {submission.userInput.cuisine && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {submission.userInput.cuisine}
                </span>
              )}
            </div>

            {submission.userInput.comments && (
              <div className="text-sm text-gray-600 italic">
                &ldquo;{submission.userInput.comments}&rdquo;
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <User className="h-4 w-4 flex-shrink-0" />
                <span>Suggested by {submission.userInput.submitterName}</span>
              </div>

              {submission.placeData.googleMapsUrl && (
                <a
                  href={submission.placeData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  View on Maps
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
