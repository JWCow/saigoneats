'use client';

import React from 'react';
import { useEffect, useState } from 'react';
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

export default function NewPlacesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, 'suggestions'), orderBy('createdAt', 'desc'), limit(20));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const newSubmissions = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }) as Submission)
            .filter((submission) => submission.status === 'approved');

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

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up submissions listener:', err);
      setError('Error setting up submissions listener');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">Loading recent submissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Places</h1>
            <p className="mt-2 text-sm text-gray-500">
              Recently added locations suggested by our community
            </p>
          </div>

          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {submission.placeData.name}
                    </h3>
                    <span className="text-sm text-orange-600 font-medium">
                      {formatDistanceToNow(new Date(submission.createdAt.seconds * 1000), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="flex items-start space-x-2 text-gray-500">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{submission.placeData.address}</span>
                  </div>

                  {submission.placeData.phone && (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <span>{submission.placeData.phone}</span>
                    </div>
                  )}

                  {submission.placeData.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 flex-shrink-0 text-gray-500" />
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
                    <div className="text-gray-600 italic">
                      &ldquo;{submission.userInput.comments}&rdquo;
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Suggested by {submission.userInput.submitterName}
                    </div>
                    {submission.placeData.googleMapsUrl && (
                      <a
                        href={submission.placeData.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:text-orange-700"
                      >
                        View on Maps →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {submissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No new places have been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
