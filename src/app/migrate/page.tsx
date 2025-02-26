'use client';

import { useState } from 'react';
import { Location } from '@/data/locations';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

export default function MigratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [migrationLog, setMigrationLog] = useState<string[]>([]);

  const migrateLocations = async () => {
    setIsLoading(true);
    setMigrationLog([]);

    try {
      // First, get all approved suggestions
      const suggestionsQuery = query(
        collection(db, 'suggestions'),
        where('status', '==', 'approved')
      );
      const suggestionsSnapshot = await getDocs(suggestionsQuery);

      setMigrationLog((prev) => [
        ...prev,
        `Found ${suggestionsSnapshot.size} approved suggestions to migrate:`,
      ]);

      // Convert and merge suggestions into locations
      for (const suggestionDoc of suggestionsSnapshot.docs) {
        const suggestion = suggestionDoc.data();

        // Convert suggestion to location format
        const locationData = {
          id: suggestionDoc.id,
          name: suggestion.placeData.name || '',
          type: suggestion.userInput.category?.toLowerCase() || 'restaurant',
          cuisine: suggestion.userInput.cuisine || null,
          fullAddress: suggestion.placeData.address || '',
          googleMapsUrl: suggestion.placeData.googleMapsUrl || '',
          features: suggestion.userInput.cuisine
            ? [suggestion.userInput.cuisine, 'Dine-in']
            : ['Dine-in'],
          priceRange: 'medium',
          ...(suggestion.placeData.phone && {
            contact: {
              phone: suggestion.placeData.phone,
              phoneClickable: suggestion.placeData.phone.replace(/[^0-9+]/g, ''),
            },
          }),
          ...(suggestion.placeData.website && {
            website: {
              url: suggestion.placeData.website,
              label: 'Visit Website',
            },
          }),
          ...(suggestion.userInput.comments && {
            description: suggestion.userInput.comments,
          }),
          submittedAt: suggestion.createdAt || null,
          suggestedBy: suggestion.userInput.submitterName || 'Anonymous',
          votes: suggestion.votes || 0,
          votedBy: suggestion.votedBy || [],
          status: 'approved',
          source: 'suggestion',
        };

        // Add to locations collection
        await setDoc(doc(db, 'locations', suggestionDoc.id), locationData);
        setMigrationLog((prev) => [
          ...prev,
          `✓ Successfully migrated suggestion: ${suggestion.placeData.name}`,
        ]);
      }

      // Note about static locations
      setMigrationLog((prev) => [
        ...prev,
        `\nStatic locations have already been migrated to Firebase.`,
      ]);

      // Verify final migration count
      const locationsSnapshot = await getDocs(collection(db, 'locations'));
      const totalLocations = locationsSnapshot.size;

      setMigrationLog((prev) => [
        ...prev,
        `\nMigration complete!`,
        `Total locations in database: ${totalLocations}`,
        `- Migrated suggestions: ${suggestionsSnapshot.size}`,
        `✓ All locations successfully migrated!`,
      ]);
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      setMigrationLog((prev) => [...prev, `❌ Error during migration: ${errorMessage}`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Migrate Locations to Firebase</h1>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Note:</strong> Static locations have already been migrated to Firebase. This page
          now only handles migration of approved user suggestions.
        </p>
      </div>
      <div className="space-y-4">
        <Button
          onClick={migrateLocations}
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isLoading ? 'Migrating...' : 'Migrate Approved Suggestions'}
        </Button>
        {migrationLog.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Migration Log:</h2>
            <pre className="whitespace-pre-wrap text-sm">{migrationLog.join('\n')}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
