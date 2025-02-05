'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-orange-600">
            Saigon Eats
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/american" className="text-gray-600 hover:text-orange-600">
              American
            </Link>
            <Link href="/vietnamese" className="text-gray-600 hover:text-orange-600">
              Vietnamese
            </Link>
            <Link href="/pizza" className="text-gray-600 hover:text-orange-600">
              Pizza
            </Link>
            <Link href="/chinese" className="text-gray-600 hover:text-orange-600">
              Chinese
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/american"
                className="block px-3 py-2 text-gray-600 hover:text-orange-600"
              >
                American
              </Link>
              <Link
                href="/vietnamese"
                className="block px-3 py-2 text-gray-600 hover:text-orange-600"
              >
                Vietnamese
              </Link>
              <Link href="/pizza" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                Pizza
              </Link>
              <Link href="/chinese" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                Chinese
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
