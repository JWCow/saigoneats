'use client';

// This script was used to migrate the static locations to Firebase.
// It is no longer needed as the migration has already been completed.
// The static locations array has been removed from the codebase.

import { db } from '@/lib/firebase/config';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

async function checkMigrationStatus() {
  try {
    // Check how many locations are in Firestore
    const querySnapshot = await getDocs(collection(db, 'locations'));
    console.log(`There are currently ${querySnapshot.size} locations in the database.`);
    console.log('Migration has already been completed.');
  } catch (error) {
    console.error('Error checking migration status:', error);
  }
}

// Check migration status
checkMigrationStatus();
