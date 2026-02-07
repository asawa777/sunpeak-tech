"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoTicker } from "@/components/logo-ticker";
import { VividGlobe } from "@/components/3d/globe";

/**
 * 3D PREFAB COMPONENTS (Internal)
 */

// --- UTILS ---
// --- MAIN 3D SCENE ---
const GlobeScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 16], fov: 35 }}>
            <fog attach="fog" args={["#001732", 12, 35]} />
            <ambientLight intensity={0.6} />
            <pointLight position={[20, 20, 20]} intensity={2.5} color="#4361EE" />
            <pointLight position={[-20, -10, -10]} intensity={1.5} color="#64ffda" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <group position={[0, -2, 0]}>
                <VividGlobe />
            </group>
            
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI/3} />
        </Canvas>
    );
};




/**
 * UI COMPONENTS
 */




export function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#001732]">
            {/* 1. 3D Background */}
            <div className="absolute inset-0 z-0">
                <GlobeScene />
            </div>

            {/* 2. Gradient Overlays for Readability */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#001732_80%)]" />
            <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-b from-[#001732]/30 via-transparent to-[#001732]" />
            
            {/* 3. Atmospheric Glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen opacity-60" />

            {/* 4. Content */}
            {/* InternalNavbar is now global Header in layout.tsx */}

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center pt-20">
                
                {/* Hero Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-5xl mx-auto space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-4">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">Global System Integrator</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl">
                        Engineering Tomorrow's<br/> 
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-white to-purple-300">
                             Infrastructure. Today.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Trusted by governments and enterprises across Southeast Asia to 
                        design, build, and operate mission-critical technology systems.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-10"
                >
                    <Button size="lg" className="h-14 px-8 text-lg font-normal rounded-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20 border-0">
                         Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-normal rounded-full border-white/10 text-white hover:bg-white/5 hover:text-white backdrop-blur-xl bg-white/5">
                         Request Consultation
                    </Button>
                </motion.div>

                {/* Trust Signal */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="w-full mt-10"
                >
                    <LogoTicker />
                </motion.div>
            </div>
        </section>
    );
}
