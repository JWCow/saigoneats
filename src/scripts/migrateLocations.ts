'use client';

import { locations } from '@/data/locations';
import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

async function migrateLocations() {
  try {
    for (const location of locations) {
      // Add votes and votedBy fields to each location
      const locationWithVoting = {
        ...location,
        votes: 0,
        votedBy: [],
      };

      // Add to Firestore with the same ID
      await setDoc(doc(db, 'locations', location.id), locationWithVoting);
      console.log(`Migrated location: ${location.name}`);
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migrateLocations(); 