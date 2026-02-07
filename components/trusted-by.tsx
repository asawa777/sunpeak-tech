"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logos from "@/public/logos.json";
import { cn } from "@/lib/utils";

export function TrustedBy() {
  // Use all logos in both rows for continuous flow, or split if too many.
  // Given 26 logos, splitting is better.
  const midPoint = Math.ceil(logos.length / 2);
  const row1Logos = logos.slice(0, midPoint);
  const row2Logos = logos.slice(midPoint);

  // Duplicate for seamless loop
  const row1 = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
  const row2 = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <div className="w-full py-20 flex flex-col items-center gap-10 overflow-hidden relative z-20">
      <div className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500">
            Trusted by Industry Leaders
          </p>
      </div>

      <div className="relative w-full flex flex-col gap-12 mask-image-b-linear-gradient">
        {/* Row 1: Left to Right (Moving Left) */}
        <div className="flex w-full overflow-hidden select-none mask-image-gradient">
            <motion.div
                className="flex gap-16 min-w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40,
                }}
            >
                {row1.map((logo, idx) => (
                    <div
                        key={`row1-${idx}`}
                        className="relative h-12 w-32 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-110"
                    >
                        <Image
                            src={logo}
                            alt="Partner Logo"
                            width={120}
                            height={48}
                            className="object-contain w-full h-full"
                        />
                    </div>
                ))}
            </motion.div>
        </div>

        {/* Row 2: Right to Left (Moving Right) */}
        <div className="flex w-full overflow-hidden select-none mask-image-gradient">
             <motion.div
                className="flex gap-16 min-w-max items-center"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 45,
                }}
            >
                {row2.map((logo, idx) => (
                    <div
                        key={`row2-${idx}`}
                        className="relative h-12 w-32 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-110"
                    >
                        <Image
                            src={logo}
                            alt="Partner Logo"
                            width={120}
                            height={48}
                            className="object-contain w-full h-full"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
}
