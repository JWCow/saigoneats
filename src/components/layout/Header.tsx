'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search } from 'lucide-react';

const categories = [
  { name: 'All Locations', href: '/locations' },
  { name: 'Featured', href: '/featured' },
  { name: 'New Places', href: '/new' },
  { name: 'Popular', href: '/popular' },
  { name: 'Categories', href: '/categories' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span className="hidden sm:inline">Saigon</span>
            <span>Eats</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/search"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
