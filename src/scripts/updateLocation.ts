import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

async function updateLocationStatus() {
  try {
    const locationRef = doc(db, 'locations', 'CJ1L4XNqBqR81OLgIkKa');
    await updateDoc(locationRef, {
      status: 'approved',
    });
    console.log('Location status updated to approved');
  } catch (error) {
    console.error('Error updating location:', error);
  }
}

updateLocationStatus();
