import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

const GoogleMapsScript = dynamic(() => import('@/components/GoogleMapsScript'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://saigoneats.vercel.app'),
  title: 'SaigonEats - Discover the Best Food in Ho Chi Minh City',
  description:
    'Explore the finest restaurants, cafes, and bars in Saigon. From traditional Vietnamese cuisine to international flavors, find the perfect dining spot in Ho Chi Minh City.',
  keywords: [
    'Saigon restaurants',
    'Ho Chi Minh City food',
    'Vietnamese cuisine',
    'best restaurants in Saigon',
    'HCMC dining',
    'Saigon cafes',
    'Saigon bars',
  ],
  authors: [{ name: 'SaigonEats Team' }],
  openGraph: {
    title: 'SaigonEats - Discover the Best Food in Ho Chi Minh City',
    description:
      'Explore the finest restaurants, cafes, and bars in Saigon. From traditional Vietnamese cuisine to international flavors, find the perfect dining spot in Ho Chi Minh City.',
    url: 'https://saigoneats.vercel.app',
    siteName: 'SaigonEats',
    images: [
      {
        url: 'https://saigoneats.vercel.app/metasitecard.png',
        width: 1200,
        height: 630,
        alt: 'SaigonEats - Food Guide to Ho Chi Minh City',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaigonEats - Discover the Best Food in Ho Chi Minh City',
    description:
      'Explore the finest restaurants, cafes, and bars in Saigon. From traditional Vietnamese cuisine to international flavors, find the perfect dining spot in Ho Chi Minh City.',
    images: ['https://saigoneats.vercel.app/metasitecard.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <GoogleMapsScript />
        <Header />
        <main className="flex-grow">{children}</main>
        <FloatingActionButton />
        <Footer />
      </body>
    </html>
  );
}
