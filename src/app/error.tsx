'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message || 'An unexpected error occurred.'}</p>
      {error.digest && <p className="text-sm text-gray-500 mb-4">Error ID: {error.digest}</p>}
      <button
        onClick={reset}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
      >
        Try again
      </button>
    </div>
  );
}
