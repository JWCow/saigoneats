'use client';

import React from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/lib/store';
import { useEffect } from 'react';
import { locations, District, Cuisine } from '@/data/locations';
import { MapPin, Utensils, Search } from 'lucide-react';
import UserSubmissions from '@/components/features/UserSubmissions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function Home() {
  const setLocations = useLocationStore((state) => state.setLocations);

  useEffect(() => {
    setLocations(locations);
  }, [setLocations]);

  // Helper function to format cuisine names
  const formatCuisineName = (cuisine: string) => {
    return cuisine
      .split(/[\s_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Get main cuisines (excluding unpopulated and utility categories)
  const mainCuisines = Object.values(Cuisine).filter(
    (cuisine) =>
      ![
        'cafe',
        'bakery',
        'dessert',
        'international',
        'fusion',
        'seafood',
        'bbq',
        'street_food',
      ].includes(cuisine)
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Discover the Best Food in</span>
                <span className="block text-gradient">Ho Chi Minh City</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
                Find and explore the finest restaurants, cafes, and hidden gems in Saigon.
              </p>
            </div>

            <div className="max-w-lg mx-auto flex gap-4 justify-center">
              <Input
                placeholder="Search for restaurants..."
                className="w-full max-w-sm shadow-sm"
                prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
              <Button>Search</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Suggestions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Community Suggestions
                  </CardTitle>
                  <CardDescription>
                    Places discovered and shared by fellow food lovers
                  </CardDescription>
                </div>
                <Button variant="ghost" asChild>
                  <Link href="/new" className="text-orange-600 hover:text-orange-700 font-medium">
                    See all →
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UserSubmissions />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Districts Overview */}
      <section className="py-16 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Where do you want to eat?
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {Object.values(District).map((district) => (
              <motion.div key={district} variants={item}>
                <Link
                  href={`/locations?district=${encodeURIComponent(district)}`}
                  className="block"
                >
                  <Card className="group hover:shadow-md transition-all duration-200 border-2 hover:border-orange-200 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                          {district}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            What are you craving?
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {mainCuisines.map((cuisine) => (
              <motion.div key={cuisine} variants={item}>
                <Link href={`/locations?cuisine=${encodeURIComponent(cuisine)}`} className="block">
                  <Card className="group hover:shadow-md transition-all duration-200 border-2 hover:border-orange-200 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                          {formatCuisineName(cuisine)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
