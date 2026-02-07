"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logos from "@/public/logos.json";
import { cn } from "@/lib/utils";

export function LogoTicker() {
  // Use all logos for a single long row
  // Duplicate enough times to ensure seamless scrolling across wide screens
  // 4 copies should be plenty for even 4k screens given the number of logos
  const logoSet = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-[#02040A] relative z-20">
      
      {/* Container for the ticker */}
      <div className="relative w-full max-w-[100vw] flex flex-col gap-12">
        
        {/* Gradient Masks for Fade In/Out Effect */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-10 bg-gradient-to-r from-[#02040A] via-[#02040A]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-10 bg-gradient-to-l from-[#02040A] via-[#02040A]/80 to-transparent pointer-events-none" />

        {/* The Ticker Track */}
        <div className="flex w-full overflow-hidden select-none group mask-image-b-linear-gradient">
            <div
                className="flex gap-8 min-w-max items-center animate-infinite-scroll group-hover:[animation-play-state:paused]"
            >
                {/* We map the duplicated set. 
                    Since we animate to -50% (half width), we need enough width to cover the screen plus scroll.
                */}
                {logoSet.map((logo, idx) => (
                    <div
                        key={`ticker-${idx}`}
                        className="relative h-24 w-48 flex-shrink-0 flex items-center justify-center 
                                   hover:scale-110 transition-all duration-300 ease-out cursor-pointer group/card"
                    >
                        <div className="relative w-full h-full p-6 opacity-60 grayscale group-hover/card:opacity-100 group-hover/card:grayscale-0 transition-all duration-300">
                             <Image
                                src={logo}
                                alt={`Partner Logo ${idx}`}
                                fill
                                className="object-contain"
                                sizes="200px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
