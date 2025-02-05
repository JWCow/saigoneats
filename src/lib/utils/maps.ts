import { Address } from '@/data/locations';

export function generateMapsUrl(address: Address): string {
  try {
    const formattedAddress = `${address.street}, ${address.district}, ${address.city}, Vietnam`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    
    // Check if we're on a mobile device
    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use geo URI scheme for mobile devices
      return `geo:0,0?q=${encodedAddress}`;
    }
    
    // Use Google Maps URL for web
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  } catch (error) {
    console.error('Error generating maps URL:', error);
    return '#';
  }
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('geo:');
} 