'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useLocationStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const setSearchTerm = useLocationStore(state => state.setSearchTerm)
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerm(searchQuery)
    router.push('/locations')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Search for restaurants, cuisines, or districts..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
} 