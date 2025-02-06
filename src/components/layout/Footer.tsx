'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Featured', href: '/featured' },
    { name: 'Categories', href: '/categories' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Logo size="lg" className="mb-2" />
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {navigation.social.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} SaigonEats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
