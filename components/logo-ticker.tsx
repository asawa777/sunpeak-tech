"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogoCard } from "@/components/ui/logo-card";
import logos from "@/public/logos.json";

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
            {/* Ticker Container with Liquid Spacing */}
            <div className="flex w-max min-w-full animate-infinite-scroll group-hover:[animation-play-state:paused] gap-8 pl-8">
                {logoSet.map((logo, idx) => (
                    <LogoCard 
                        key={`ticker-${idx}`}
                        src={logo}
                        alt={`Partner Logo ${idx}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
