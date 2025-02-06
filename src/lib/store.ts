/* eslint-disable no-console */
import { create } from 'zustand';
import { Location, LocationType, Cuisine, District } from '@/data/locations';

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
    cuisines?: string[];
  };
  status: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const convertSubmissionToLocation = (submission: Submission): Location => {
  // Helper function to normalize cuisine
  const normalizeCuisine = (cuisine: string | null): Cuisine | undefined => {
    if (!cuisine) return undefined;
    console.log('Normalizing cuisine:', cuisine);
    // Convert first letter to uppercase, rest to lowercase
    const normalized = cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase();
    console.log('Normalized to:', normalized);
    return normalized as Cuisine;
  };

  // Generate features from submission data
  const generateFeatures = (submission: Submission): string[] => {
    const features: string[] = [];

    // Add category as a feature if it's not just "restaurant"
    if (submission.userInput.category.toLowerCase() !== 'restaurant') {
      features.push(submission.userInput.category);
    }

    // Add cuisines as features
    if (submission.userInput.cuisines && Array.isArray(submission.userInput.cuisines)) {
      console.log('Adding cuisine features from array:', submission.userInput.cuisines);
      features.push(...submission.userInput.cuisines);
    } else if (submission.userInput.cuisine) {
      console.log('Adding single cuisine feature:', submission.userInput.cuisine);
      features.push(submission.userInput.cuisine);
    }

    // Add "Dine-in" as a default feature since most places offer it
    features.push('Dine-in');

    // If there are comments, look for keywords that might indicate features
    if (submission.userInput.comments) {
      const comments = submission.userInput.comments.toLowerCase();
      if (comments.includes('delivery')) features.push('Delivery');
      if (
        comments.includes('takeaway') ||
        comments.includes('take away') ||
        comments.includes('take-away')
      )
        features.push('Takeaway');
      if (comments.includes('breakfast')) features.push('Breakfast');
      if (comments.includes('lunch')) features.push('Lunch');
      if (comments.includes('dinner')) features.push('Dinner');
      if (comments.includes('wifi') || comments.includes('wi-fi')) features.push('WiFi');
      if (comments.includes('parking')) features.push('Parking');
      if (comments.includes('reservation')) features.push('Reservation');
    }

    console.log('Generated features before normalization:', features);
    // Remove duplicates and capitalize each feature
    const normalizedFeatures = Array.from(new Set(features)).map((feature: string) =>
      feature
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    );
    console.log('Generated features after normalization:', normalizedFeatures);
    return normalizedFeatures;
  };

  // Safely handle createdAt timestamp
  const submittedAt = submission.createdAt?.seconds
    ? new Date(submission.createdAt.seconds * 1000)
    : new Date();

  // Get the primary cuisine from the cuisines array if available
  const primaryCuisine = submission.userInput.cuisines?.[0] || submission.userInput.cuisine;

  return {
    id: submission.id,
    name: submission.placeData.name || 'Unnamed Location',
    type: submission.userInput.category.toLowerCase() as LocationType,
    cuisine: normalizeCuisine(primaryCuisine),
    fullAddress: submission.placeData.address || 'Address not provided',
    googleMapsUrl: submission.placeData.googleMapsUrl || '',
    features: generateFeatures(submission) || [],
    priceRange: 'medium',
    website: submission.placeData.website
      ? {
          url: submission.placeData.website,
          label: 'Visit Website',
        }
      : undefined,
    contact: submission.placeData.phone
      ? {
          phone: submission.placeData.phone,
          phoneClickable: submission.placeData.phone.replace(/[^0-9+]/g, ''),
        }
      : undefined,
    description: submission.userInput.comments || undefined,
    submittedAt,
    suggestedBy: submission.userInput.submitterName || 'Anonymous',
    votes: (submission as any).votes || 0,
    votedBy: (submission as any).votedBy || [],
  };
};

/* eslint-disable no-unused-vars */
interface FilterState {
  locations: Location[];
  userSubmissions: Submission[];
  filteredLocations: Location[];
  searchTerm: string;
  selectedType: LocationType | null;
  selectedCuisine: Cuisine | null;
  selectedDistrict: District | null;
  priceRange: 'low' | 'medium' | 'high' | null;
  sortBy: 'name' | 'rating' | 'priceRange' | null;

  setLocations: (locations: Location[]) => void;
  setUserSubmissions: (submissions: Submission[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSelectedType: (selectedType: LocationType | null) => void;
  setSelectedCuisine: (selectedCuisine: Cuisine | null) => void;
  setSelectedDistrict: (selectedDistrict: District | null) => void;
  setPriceRange: (priceRange: 'low' | 'medium' | 'high' | null) => void;
  setSortBy: (sortBy: 'name' | 'rating' | 'priceRange' | null) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}
/* eslint-enable no-unused-vars */

export const useLocationStore = create<FilterState>((set, get) => ({
  locations: [],
  userSubmissions: [],
  filteredLocations: [],
  searchTerm: '',
  selectedType: null,
  selectedCuisine: null,
  selectedDistrict: null,
  priceRange: null,
  sortBy: null,

  setLocations: (locations) => {
    set({ locations });
    get().applyFilters();
  },

  setUserSubmissions: (submissions) => {
    console.log('Setting user submissions:', submissions);
    set({ userSubmissions: submissions });
    get().applyFilters();
  },

  setSearchTerm: (searchTerm) => {
    set({ searchTerm });
    get().applyFilters();
  },

  setSelectedType: (selectedType) => {
    set({ selectedType });
    get().applyFilters();
  },

  setSelectedCuisine: (selectedCuisine) => {
    set({ selectedCuisine });
    get().applyFilters();
  },

  setSelectedDistrict: (selectedDistrict) => {
    set({ selectedDistrict });
    get().applyFilters();
  },

  setPriceRange: (priceRange) => {
    set({ priceRange });
    get().applyFilters();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFilters();
  },

  resetFilters: () => {
    set({
      searchTerm: '',
      selectedType: null,
      selectedCuisine: null,
      selectedDistrict: null,
      priceRange: null,
      sortBy: null,
    });
    get().applyFilters();
  },

  applyFilters: () => {
    const {
      locations,
      userSubmissions,
      searchTerm,
      selectedType,
      selectedCuisine,
      selectedDistrict,
      priceRange,
      sortBy,
    } = get();

    console.log('Applying filters with:', {
      locationsCount: locations.length,
      userSubmissionsCount: userSubmissions.length,
    });

    // Convert approved submissions to locations
    const submissionLocations = userSubmissions
      .filter((sub) => sub.status === 'approved')
      .map(convertSubmissionToLocation);

    console.log('Converted submissions:', submissionLocations);

    // Combine both arrays
    let filtered = [...locations, ...submissionLocations];

    console.log('Combined locations count:', filtered.length);

    if (selectedType) {
      filtered = filtered.filter((location) => location.type === selectedType);
    }

    if (selectedCuisine) {
      console.log('Filtering by cuisine:', selectedCuisine);
      console.log(
        'Locations before cuisine filter:',
        filtered.map((loc) => ({
          name: loc.name,
          cuisine: loc.cuisine,
          features: loc.features,
        }))
      );
      filtered = filtered.filter((location) => {
        // Check both cuisine and features for a match
        const cuisineMatch = location.cuisine === selectedCuisine;
        const featureMatch =
          location.features?.some(
            (feature) => feature.toLowerCase() === selectedCuisine.toLowerCase()
          ) ?? false;
        const match = cuisineMatch || featureMatch;

        console.log(`Location ${location.name}:`, {
          cuisine: location.cuisine,
          features: location.features || [],
          selectedCuisine,
          cuisineMatch,
          featureMatch,
          match,
        });

        return match;
      });
      console.log(
        'Locations after cuisine filter:',
        filtered.map((loc) => ({
          name: loc.name,
          cuisine: loc.cuisine,
          features: loc.features,
        }))
      );
    }

    if (selectedDistrict) {
      filtered = filtered.filter(
        (location) =>
          location.fullAddress?.toLowerCase().includes(selectedDistrict.toLowerCase()) ?? false
      );
    }

    if (priceRange) {
      filtered = filtered.filter((location) => location.priceRange === priceRange);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (location) =>
          location.name.toLowerCase().includes(term) ||
          location.fullAddress.toLowerCase().includes(term) ||
          location.description?.toLowerCase().includes(term)
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'rating':
            return ((b as any).rating || 0) - ((a as any).rating || 0);
          case 'priceRange': {
            const priceOrder: Record<'low' | 'medium' | 'high', number> = {
              low: 0,
              medium: 1,
              high: 2,
            };
            return priceOrder[a.priceRange] - priceOrder[b.priceRange];
          }
          default:
            return 0;
        }
      });
    }

    console.log('Final filtered locations:', filtered);
    set({ filteredLocations: filtered });
  },
}));
