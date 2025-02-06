import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import dynamic from 'next/dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

const GoogleMapsScript = dynamic(() => import('@/components/GoogleMapsScript'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://saigoneats.vercel.app'),
  title: 'SaigonEats - Discover the Best Food in Ho Chi Minh City',
  description: 'Find and explore the finest restaurants, cafes, and hidden gems in Saigon.',
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
    description: 'Find and explore the finest restaurants, cafes, and hidden gems in Saigon.',
    url: 'https://saigoneats.vercel.app',
    siteName: 'SaigonEats',
    images: [
      {
        url: '/metasitecard.png',
        width: 1200,
        height: 630,
        alt: "SaigonEats - Your Guide to Saigon's Best Food",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaigonEats - Discover the Best Food in Ho Chi Minh City',
    description: 'Find and explore the finest restaurants, cafes, and hidden gems in Saigon.',
    images: ['/metasitecard.png'],
    creator: '@saigoneats',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon.ico' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.png',
        color: '#ea580c',
      },
    ],
  },
  manifest: '/site.webmanifest',
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
  themeColor: '#ea580c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${lexend.variable} font-sans min-h-full flex flex-col`}>
        <GoogleMapsScript />
        <Header />
        <main className="flex-grow">{children}</main>
        <FloatingActionButton />
        <Footer />
      </body>
    </html>
  );
}
