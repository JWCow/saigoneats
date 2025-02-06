'use client';

import { useState } from 'react';
import { locations } from '@/data/locations';
import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

export default function MigratePage() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const migrateLocations = async () => {
    setIsLoading(true);
    setStatus('Starting migration...');
    try {
      for (const location of locations) {
        // Add votes, votedBy fields, and ensure priceRange exists
        const locationWithVoting = {
          ...location,
          votes: 0,
          votedBy: [],
          priceRange: location.priceRange || 'medium', // Default to 'medium' if not set
        };

        // Add to Firestore with the same ID
        await setDoc(doc(db, 'locations', location.id), locationWithVoting);
        setStatus(`Migrated location: ${location.name}`);
      }
      setStatus('Migration complete!');
    } catch (error: any) {
      console.error('Error during migration:', error);
      setStatus(`Error during migration: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Migrate Locations to Firebase</h1>
      <div className="space-y-4">
        <Button 
          onClick={migrateLocations} 
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isLoading ? 'Migrating...' : 'Start Migration'}
        </Button>
        {status && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <pre className="whitespace-pre-wrap">{status}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 