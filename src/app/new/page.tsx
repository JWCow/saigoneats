'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MapPin, Phone, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteButton from '@/components/ui/VoteButton';
import { LocationType, Cuisine, Location as BaseLocation } from '@/data/locations';

interface Location extends Omit<BaseLocation, 'submittedAt'> {
  source: 'suggestion' | 'static';
  status: 'approved' | 'pending';
  submittedAt: any; // Keep this as any since we handle the conversion in the code
}

export default function NewPlacesPage() {
  const [submissions, setSubmissions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simplified query to test index issues
      const q = query(
        collection(db, 'locations'),
        where('source', '==', 'suggestion'),
        orderBy('submittedAt', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const newSubmissions = snapshot.docs
            .map((doc) => {
              const data = doc.data();
              // Ensure submittedAt is properly handled
              const submittedAt = data.submittedAt?.toDate?.() || data.submittedAt;
              // Convert cuisine string to enum if it exists
              const cuisine = data.cuisine ? (data.cuisine.toLowerCase() as Cuisine) : undefined;
              return {
                id: doc.id,
                ...data,
                submittedAt,
                cuisine,
                type: data.type.toLowerCase() as LocationType,
                features: data.features || [],
                priceRange: data.priceRange || 'medium',
              } as Location;
            })
            .filter((submission) => submission.status === 'approved'); // Filter in memory instead

          setSubmissions(newSubmissions);
          setLoading(false);
          setError(null);
        },
        (_err) => {
          setError('Error fetching submissions');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (_err) {
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
            <p className="mt-2 text-sm text-gray-600">
              Recently added locations suggested by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
              >
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
                      {submission.description}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>Suggested by {submission.suggestedBy}</span>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(submission.submittedAt, { addSuffix: true })}
                      </span>
                    </div>
                    <VoteButton location={submission} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
