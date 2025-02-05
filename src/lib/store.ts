import { create } from 'zustand'
import { Location, LocationType, Cuisine, District } from '@/data/locations'
import { StateCreator } from 'zustand'

interface FilterState {
  locations: Location[]
  filteredLocations: Location[]
  searchTerm: string
  selectedType: LocationType | null
  selectedCuisine: Cuisine | null
  selectedDistrict: District | null
  priceRange: 'low' | 'medium' | 'high' | null
  sortBy: 'name' | 'rating' | 'priceRange' | null
  
  setLocations: (locations: Location[]) => void
  setSearchTerm: (term: string) => void
  setSelectedType: (type: LocationType | null) => void
  setSelectedCuisine: (cuisine: Cuisine | null) => void
  setSelectedDistrict: (district: District | null) => void
  setPriceRange: (range: 'low' | 'medium' | 'high' | null) => void
  setSortBy: (sort: 'name' | 'rating' | 'priceRange' | null) => void
  resetFilters: () => void
  applyFilters: () => void
}

export const useLocationStore = create<FilterState>((set, get) => ({
  locations: [],
  filteredLocations: [],
  searchTerm: '',
  selectedType: null,
  selectedCuisine: null,
  selectedDistrict: null,
  priceRange: null,
  sortBy: null,

  setLocations: (locations: Location[]) => {
    set({ locations })
    get().applyFilters()
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term })
    get().applyFilters()
  },

  setSelectedType: (type: LocationType | null) => {
    set({ selectedType: type })
    get().applyFilters()
  },

  setSelectedCuisine: (cuisine: Cuisine | null) => {
    set({ selectedCuisine: cuisine })
    get().applyFilters()
  },

  setSelectedDistrict: (district: District | null) => {
    set({ selectedDistrict: district })
    get().applyFilters()
  },

  setPriceRange: (range: 'low' | 'medium' | 'high' | null) => {
    set({ priceRange: range })
    get().applyFilters()
  },

  setSortBy: (sort: 'name' | 'rating' | 'priceRange' | null) => {
    set({ sortBy: sort })
    get().applyFilters()
  },

  resetFilters: () => {
    set({
      searchTerm: '',
      selectedType: null,
      selectedCuisine: null,
      selectedDistrict: null,
      priceRange: null,
      sortBy: null
    })
    get().applyFilters()
  },

  applyFilters: () => {
    const {
      locations,
      searchTerm,
      selectedType,
      selectedCuisine,
      selectedDistrict,
      priceRange,
      sortBy
    } = get()

    let filtered = [...locations]

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(location => location.type === selectedType)
    }

    // Apply cuisine filter
    if (selectedCuisine) {
      filtered = filtered.filter(location => location.cuisine === selectedCuisine)
    }

    // Apply district filter
    if (selectedDistrict) {
      filtered = filtered.filter(location => location.address.district === selectedDistrict)
    }

    // Apply price range filter
    if (priceRange) {
      filtered = filtered.filter(location => location.priceRange === priceRange)
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(term) ||
        location.address.street.toLowerCase().includes(term) ||
        location.description?.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          case 'priceRange': {
            const priceOrder: Record<'low' | 'medium' | 'high', number> = { low: 0, medium: 1, high: 2 }
            return priceOrder[a.priceRange] - priceOrder[b.priceRange]
          }
          default:
            return 0
        }
      })
    }

    set({ filteredLocations: filtered })
  }
})) 