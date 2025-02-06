'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the food items with their names and image paths
const foodItems = [
  { name: 'pho', title: 'Phở' },
  { name: 'banh-mi', title: 'Bánh Mì' },
  { name: 'spring-rolls', title: 'Gỏi Cuốn' },
  { name: 'com-tam', title: 'Cơm Tấm' },
  { name: 'banh-xeo', title: 'Bánh Xèo' },
  { name: 'bun-bo-hue', title: 'Bún Bò Huế' },
  { name: 'ca-phe-sua-da', title: 'Cà Phê Sữa Đá' },
  { name: 'bun-cha', title: 'Bún Chả' },
  { name: 'mi-quang', title: 'Mì Quảng' },
  { name: 'banh-cuon', title: 'Bánh Cuốn' },
];

// Duplicate the items to create a seamless loop
const duplicatedFoodItems = [...foodItems, ...foodItems];

export default function InfiniteCarousel() {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-gradient-to-b from-transparent to-white/10">
      <motion.div
        className="flex gap-2"
        animate={{
          x: [0, -50 * foodItems.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {duplicatedFoodItems.map((item, index) => (
          <div key={`${item.name}-${index}`} className="relative flex-none w-36 h-36 group">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={`/images/food/${item.name}.jpg`}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
