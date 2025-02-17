'use client';

import React, { useState, useEffect } from 'react';
import { LocationType, Cuisine, District } from '@/data/locations';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import usePlacesAutocomplete, { getGeocode, getDetails } from 'use-places-autocomplete';
import Toast from '@/components/ui/Toast';

interface SuggestionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlaceDetails {
  name?: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  website?: string;
  url?: string;
  place_id?: string;
  types?: string[];
}

// Add mapping for Google Places types to our categories
const placeTypeToCategory: Record<string, LocationType> = {
  restaurant: LocationType.Restaurant,
  cafe: LocationType.Cafe,
  bar: LocationType.Bar,
  food: LocationType.Restaurant,
  meal_takeaway: LocationType.Restaurant,
  meal_delivery: LocationType.Restaurant,
  bakery: LocationType.Bakery,
  night_club: LocationType.Bar,
};

// Add mapping for place types to cuisines
const placeTypeToCuisine: Record<string, Cuisine> = {
  vietnamese_restaurant: Cuisine.Vietnamese,
  chinese_restaurant: Cuisine.Chinese,
  japanese_restaurant: Cuisine.Japanese,
  thai_restaurant: Cuisine.Thai,
  italian_restaurant: Cuisine.Italian,
  american_restaurant: Cuisine.American,
  korean_restaurant: Cuisine.Korean,
  french_restaurant: Cuisine.French,
  pizza_restaurant: Cuisine.Pizza,
  burger_restaurant: Cuisine.Burger,
  mexican_restaurant: Cuisine.Mexican,
  seafood_restaurant: Cuisine.Seafood,
  bbq_restaurant: Cuisine.BBQ,
  bakery: Cuisine.Bakery,
  cafe: Cuisine.Cafe,
  dessert: Cuisine.Dessert,
  restaurant: Cuisine.International,
  food: Cuisine.International,
};

// Add this helper function near the top of the file, after the imports
const formatCategoryName = (category: string): string => {
  // Split by space or underscore and capitalize each word
  return category
    .split(/[\s_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function SuggestionForm({ isOpen, onClose }: SuggestionFormProps) {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true);
      } else {
        setTimeout(checkGoogleMapsLoaded, 100);
      }
    };

    checkGoogleMapsLoaded();
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'vn' },
      types: ['establishment'],
    },
    debounce: 300,
    defaultValue: '',
    cache: 24 * 60 * 60,
    initOnMount: isGoogleMapsLoaded,
  });

  // Debug logs only in development
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [category, setCategory] = useState<LocationType | ''>('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [submitterName, setSubmitterName] = useState('');
  const [manualData, setManualData] = useState({
    name: '',
    street: '',
    district: '' as District | '',
    phone: '',
    website: '',
  });

  const detectCategoryAndCuisine = (types: string[] = []) => {
    let detectedCuisine: Cuisine | '' = '';
    for (const type of types) {
      if (type in placeTypeToCuisine) {
        detectedCuisine = placeTypeToCuisine[type];
        break;
      }
    }

    let detectedCategory: LocationType | '' = '';
    for (const type of types) {
      if (type in placeTypeToCategory) {
        detectedCategory = placeTypeToCategory[type];
        break;
      }
    }

    return { detectedCategory, detectedCuisine };
  };

  const handleSelect = async (suggestion: any) => {
    setValue(suggestion.description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ placeId: suggestion.place_id });
      const { place_id } = results[0];

      const placeDetails = (await getDetails({
        placeId: place_id,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'website',
          'url',
          'geometry',
          'place_id',
          'types',
          'rating',
          'user_ratings_total',
        ],
      })) as PlaceDetails;

      // Detect category and cuisine from place types
      const { detectedCategory, detectedCuisine } = detectCategoryAndCuisine(placeDetails.types);

      if (detectedCategory) {
        setCategory(detectedCategory);
      }

      if (detectedCuisine) {
        setSelectedCuisines([detectedCuisine]);
      }

      // Create a simplified place object
      const simplifiedPlace: PlaceDetails = {
        name: placeDetails.name || suggestion.description,
        formatted_address: placeDetails.formatted_address || suggestion.description,
        formatted_phone_number: placeDetails.formatted_phone_number || '',
        website: placeDetails.website || '',
        url:
          placeDetails.url ||
          `https://www.google.com/maps/place/?q=place_id:${suggestion.place_id}`,
        place_id: suggestion.place_id,
        types: placeDetails.types,
      };

      setPlace(simplifiedPlace);
      setToast({
        message: 'Location details loaded successfully',
        type: 'success',
      });
    } catch (_error) {
      // Create a basic place object from the suggestion if details fetch fails
      const basicPlace: PlaceDetails = {
        name: suggestion.description,
        formatted_address: suggestion.description,
        formatted_phone_number: '',
        website: '',
        url: `https://www.google.com/maps/place/?q=place_id:${suggestion.place_id}`,
        place_id: suggestion.place_id,
      };
      setPlace(basicPlace);
      setToast({
        message:
          'Some location details could not be loaded, but you can still submit the suggestion.',
        type: 'error',
      });
    }
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedCuisines(selectedValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!isManualEntry && !place) {
      setToast({
        message: 'Please select a location from the suggestions',
        type: 'error',
      });
      return;
    }

    if (isManualEntry && !manualData.name.trim()) {
      setToast({
        message: 'Please enter a location name',
        type: 'error',
      });
      return;
    }

    if (!category) {
      setToast({
        message: 'Please select a category',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      // Create the suggestion data object based on entry type
      const locationData = {
        placeData: isManualEntry
          ? {
              name: manualData.name,
              address: `${manualData.street}, ${manualData.district}, Ho Chi Minh City`,
              phone: manualData.phone,
              website: manualData.website,
              district: manualData.district,
            }
          : {
              name: place?.name || '',
              address: place?.formatted_address || '',
              phone: place?.formatted_phone_number || '',
              website: place?.website || '',
              googleMapsUrl: place?.url || '',
              placeId: place?.place_id || '',
            },
        userInput: {
          category,
          cuisines: selectedCuisines,
          comments: comments.trim(),
          submitterName: submitterName.trim(),
        },
        status: 'approved',
        source: 'suggestion',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        votes: 0,
        votedBy: [],
      };

      // Get a reference to the locations collection
      const locationsRef = collection(db, 'locations');

      // Add the document
      await addDoc(locationsRef, {
        name: locationData.placeData.name,
        type: locationData.userInput.category?.toLowerCase() || 'restaurant',
        cuisine: locationData.userInput.cuisines?.[0] || null,
        fullAddress: locationData.placeData.address,
        googleMapsUrl: locationData.placeData.googleMapsUrl || '',
        features: locationData.userInput.cuisines || ['Dine-in'],
        priceRange: 'medium',
        ...(locationData.placeData.phone && {
          contact: {
            phone: locationData.placeData.phone,
            phoneClickable: locationData.placeData.phone.replace(/[^0-9+]/g, ''),
          },
        }),
        ...(locationData.placeData.website && {
          website: {
            url: locationData.placeData.website,
            label: 'Visit Website',
          },
        }),
        ...(locationData.userInput.comments && {
          description: locationData.userInput.comments,
        }),
        submittedAt: serverTimestamp(),
        suggestedBy: locationData.userInput.submitterName || 'Anonymous',
        status: 'approved',
        source: 'suggestion',
        votes: 0,
        votedBy: [],
      });

      setToast({
        message: 'Thank you for your suggestion! Your location has been added.',
        type: 'success',
      });

      // Reset form
      setValue('');
      setPlace(null);
      setCategory('');
      setSelectedCuisines([]);
      setComments('');
      setSubmitterName('');
      setManualData({
        name: '',
        street: '',
        district: '',
        phone: '',
        website: '',
      });
      setIsManualEntry(false);

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (_error) {
      setLoading(false);
      setToast({
        message: 'Error submitting suggestion. Please try again.',
        type: 'error',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold mb-4">Suggest a Location</h2>

          {!isGoogleMapsLoaded ? (
            <div className="text-center py-4">
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isManualEntry ? (
                <>
                  <div className="relative">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={value}
                      onChange={handleInputChange}
                      disabled={!ready}
                      placeholder={ready ? 'Search for a place...' : 'Loading...'}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
                      autoComplete="off"
                    />
                    {status === 'OK' && value && (
                      <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {data.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsManualEntry(true)}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Can&apos;t find the location? Enter details manually
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Location Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={manualData.name}
                        onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        required
                        placeholder="Enter location name"
                      />
                    </div>

                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        id="street"
                        type="text"
                        value={manualData.street}
                        onChange={(e) => setManualData({ ...manualData, street: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                        District
                      </label>
                      <select
                        id="district"
                        value={manualData.district}
                        onChange={(e) =>
                          setManualData({ ...manualData, district: e.target.value as District })
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
                        required
                      >
                        <option value="">Select a district</option>
                        {Object.values(District).map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number (optional)
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={manualData.phone}
                        onChange={(e) => setManualData({ ...manualData, phone: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website (optional)
                      </label>
                      <input
                        id="website"
                        type="url"
                        value={manualData.website}
                        onChange={(e) => setManualData({ ...manualData, website: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsManualEntry(false)}
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      Back to location search
                    </button>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as LocationType)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  {Object.values(LocationType).map((type) => (
                    <option key={type} value={type} className="capitalize">
                      {formatCategoryName(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                  Cuisines (Select all that apply) (Ctrl/Cmd+Click)
                </label>
                <select
                  id="cuisine"
                  multiple
                  value={selectedCuisines}
                  onChange={handleCuisineChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
                  size={5}
                >
                  {Object.values(Cuisine).map((type) => (
                    <option key={type} value={type} className="capitalize">
                      {formatCategoryName(type)}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Selected: {selectedCuisines.map(formatCategoryName).join(', ')}
                </p>
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add any additional information..."
                />
              </div>

              <div>
                <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  id="submitterName"
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
