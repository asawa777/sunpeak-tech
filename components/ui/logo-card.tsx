import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoCardProps {
  src: string;
  alt: string;
  className?: string;
}

export function LogoCard({ src, alt, className }: LogoCardProps) {
  return (
    <div
      className={cn(
        // LIQUID GLASS CONTAINER
        "relative flex items-center justify-center",
        "h-20 w-40", // User Spec: Fixed height/width
        "bg-white/5 backdrop-blur-xl", // User Spec: Material
        "border border-white/10",
        "rounded-2xl", // User Spec: Rounded-2xl
        "shadow-lg", 
        "shrink-0", // Ensure it doesn't shrink in flex row
        className
      )}
    >
      <div className="relative w-3/4 h-3/4 flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-contain",
            
            // THE MAGIC FIX: Blend Mode + Filters
            "mix-blend-screen", 
            "grayscale opacity-70", 
            "hover:grayscale-0 hover:opacity-100", 
            "transition-all duration-500"
          )}
          sizes="160px"
        />
      </div>
    </div>
  );
}
