'use client';

import React, { useState, useEffect } from 'react';
import { LocationType, Cuisine } from '@/data/locations';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import usePlacesAutocomplete, { getGeocode, getDetails } from 'use-places-autocomplete';
import Toast from '@/components/ui/Toast';

interface SuggestionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuggestionForm({ isOpen, onClose }: SuggestionFormProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps script is loaded
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      console.log('Google Maps script loaded successfully');
      console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.slice(0, 8) + '...');
    } else {
      console.error('Google Maps script not loaded');
    }
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
  });

  // Debug logs for Places Autocomplete
  useEffect(() => {
    console.log('Autocomplete State:', {
      ready,
      value,
      status,
      suggestions: data.length,
    });
  }, [ready, value, status, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('Input changed:', newValue);
    setValue(newValue);
  };

  interface PlaceDetails {
    name?: string;
    formatted_address?: string;
    formatted_phone_number?: string;
    website?: string;
    url?: string;
    place_id?: string;
  }

  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [category, setCategory] = useState<LocationType | ''>('');
  const [cuisine, setCuisine] = useState<Cuisine | ''>('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSelect = async (suggestion: any) => {
    console.log('Selected suggestion:', suggestion);
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

      console.log('Place details:', placeDetails);

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
      };

      setPlace(simplifiedPlace);
      setToast({
        message: 'Location details loaded successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error fetching place details:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!place) {
      setToast({
        message: 'Please select a location from the suggestions',
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
      // Create the suggestion data object
      const suggestionData = {
        placeData: {
          name: place.name || '',
          address: place.formatted_address || '',
          phone: place.formatted_phone_number || '',
          website: place.website || '',
          googleMapsUrl: place.url || '',
          placeId: place.place_id || '',
        },
        userInput: {
          category,
          cuisine: cuisine || null,
          comments: comments.trim(),
        },
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      console.log('Submitting suggestion:', suggestionData);

      // Get a reference to the suggestions collection
      const suggestionRef = collection(db, 'suggestions');

      // Add the document
      const docRef = await addDoc(suggestionRef, suggestionData);
      console.log('Suggestion submitted with ID:', docRef.id);

      setToast({
        message: 'Thank you for your suggestion! We will review it shortly.',
        type: 'success',
      });

      // Reset form
      setValue('');
      setPlace(null);
      setCategory('');
      setCuisine('');
      setComments('');

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      setToast({
        message: 'Error submitting suggestion. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold mb-4">Suggest a Location</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
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
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                Cuisine
              </label>
              <select
                id="cuisine"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value as Cuisine)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
              >
                <option value="">Select a cuisine</option>
                {Object.values(Cuisine).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !place}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
