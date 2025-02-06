'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import SuggestionForm from '@/components/features/SuggestionForm';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center"
        aria-label="Suggest a location"
      >
        <Plus className="h-6 w-6" />
      </button>

      <SuggestionForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
