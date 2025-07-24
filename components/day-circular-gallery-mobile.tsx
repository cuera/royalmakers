'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { generateDayImages, generateActivityTitle } from '../utils/image-generator';

"use client"

// Desktop day titles for header text
const DAY_TITLES = [
  { title: 'Day 1 — Foundation Building', subtitle: 'Discovery & Exploration' },
  { title: 'Day 2 — Advanced Projects',  subtitle: 'Creation & Development' },
  { title: 'Day 3 — Final Showcase',     subtitle: 'Presentation & Celebration' }
];

interface DayCircularGalleryMobileProps {
  dayNumber: number;
}

export default function DayCircularGalleryMobile({ dayNumber }: DayCircularGalleryMobileProps) {
  // Auto‑generate images and activities for this day
  const dayData = generateDayImages(dayNumber);

  return (
    <div className="max-w-sm mx-auto p-4">
  {/* Removed duplicate day header, now only parent renders it */}

      {/* Auto‑generated cards */}
      <div className="space-y-4">
        {dayData.images.map((imagePath, index) => {
          const activity = generateActivityTitle(dayNumber, index);

          return (
            <motion.div
              key={`day${dayNumber}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-32 rounded-xl overflow-hidden bg-gray-900 border border-gray-700 transition-colors duration-300"
            >
              <Image
                src={imagePath}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-start p-4">
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{activity.title}</h3>
                  <p className="text-white/80 text-xs">{activity.subtitle}</p>
                </div>
              </div>
              {/* badge removed */}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
