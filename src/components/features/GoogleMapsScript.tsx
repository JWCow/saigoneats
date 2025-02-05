'use client';

import { useEffect } from 'react';

export default function GoogleMapsScript() {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => console.log('Google Maps script loaded successfully');
      script.onerror = (e) => console.error('Error loading Google Maps script:', e);
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    }
  }, []);

  return null;
} 