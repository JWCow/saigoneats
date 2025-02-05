import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Saigon Eats',
    default: 'Saigon Eats | Restaurant Directory',
  },
  description: 'Discover the best restaurants in Ho Chi Minh City',
  keywords: ['restaurants', 'food', 'Ho Chi Minh City', 'Saigon', 'dining', 'Vietnamese food'],
  authors: [{ name: 'Saigon Eats Team' }],
  openGraph: {
    title: 'Saigon Eats | Restaurant Directory',
    description: 'Discover the best restaurants in Ho Chi Minh City',
    url: 'https://saigoneats.vercel.app',
    siteName: 'Saigon Eats',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
