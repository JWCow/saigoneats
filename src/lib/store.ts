import { create } from 'zustand';
import { Location, LocationType, Cuisine, District } from '@/data/locations';

/* eslint-disable no-unused-vars */
interface FilterState {
  locations: Location[];
  filteredLocations: Location[];
  searchTerm: string;
  selectedType: LocationType | null;
  selectedCuisine: Cuisine | null;
  selectedDistrict: District | null;
  priceRange: 'low' | 'medium' | 'high' | null;
  sortBy: 'name' | 'rating' | 'priceRange' | null;

  setLocations: (locations: Location[]) => void;
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
      searchTerm,
      selectedType,
      selectedCuisine,
      selectedDistrict,
      priceRange,
      sortBy,
    } = get();

    let filtered = [...locations];

    if (selectedType) {
      filtered = filtered.filter((location) => location.type === selectedType);
    }

    if (selectedCuisine) {
      filtered = filtered.filter((location) => location.cuisine === selectedCuisine);
    }

    if (selectedDistrict) {
      filtered = filtered.filter((location) => location.address.district === selectedDistrict);
    }

    if (priceRange) {
      filtered = filtered.filter((location) => location.priceRange === priceRange);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (location) =>
          location.name.toLowerCase().includes(term) ||
          location.address.street.toLowerCase().includes(term) ||
          location.description?.toLowerCase().includes(term)
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
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

    set({ filteredLocations: filtered });
  },
}));
