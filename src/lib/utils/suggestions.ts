import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export const addApprovedSuggestionToLocations = async (suggestionDoc: any) => {
  const suggestion = suggestionDoc.data();
  
  // Convert suggestion to location format
  const locationData = {
    id: suggestionDoc.id,
    name: suggestion.placeData.name || '',
    type: suggestion.userInput.category?.toLowerCase() || 'restaurant',
    cuisine: suggestion.userInput.cuisine || null,
    fullAddress: suggestion.placeData.address || '',
    googleMapsUrl: suggestion.placeData.googleMapsUrl || '',
    features: suggestion.userInput.cuisine ? [suggestion.userInput.cuisine, 'Dine-in'] : ['Dine-in'],
    priceRange: 'medium',
    ...(suggestion.placeData.phone && {
      contact: {
        phone: suggestion.placeData.phone,
        phoneClickable: suggestion.placeData.phone.replace(/[^0-9+]/g, ''),
      }
    }),
    ...(suggestion.placeData.website && {
      website: {
        url: suggestion.placeData.website,
        label: 'Visit Website'
      }
    }),
    ...(suggestion.userInput.comments && {
      description: suggestion.userInput.comments
    }),
    submittedAt: suggestion.createdAt || null,
    suggestedBy: suggestion.userInput.submitterName || 'Anonymous',
    votes: 0,
    votedBy: [],
  };

  // Add to locations collection
  await setDoc(doc(db, 'locations', suggestionDoc.id), locationData);
  return locationData;
}; 