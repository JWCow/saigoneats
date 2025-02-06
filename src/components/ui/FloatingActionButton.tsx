'use client';

import { UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import SuggestionForm from '@/components/features/SuggestionForm';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex items-center">
        <div className="mr-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-sm text-gray-600 animate-fade-in">
          Have a suggestion?
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center group relative"
          aria-label="Suggest a location"
        >
          <UtensilsCrossed className="h-6 w-6" />
        </button>
      </div>

      <SuggestionForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
