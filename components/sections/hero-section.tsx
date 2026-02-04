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

/**
 * 3D PREFAB COMPONENTS (Internal)
 */

// --- UTILS ---
const getPosition = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// --- SHADERS ---
const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionWorld;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPositionWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fresnelFragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform float bias;
  uniform float scale;
  uniform float power;
  varying vec3 vNormal;
  varying vec3 vPositionWorld;
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPositionWorld);
    float fresnelFactor = bias + scale * pow(1.0 + dot(viewDirection, vNormal), power);
    fresnelFactor = clamp(fresnelFactor, 0.0, 1.0);
    vec3 mixedColor = mix(color2, color1, fresnelFactor);
    gl_FragColor = vec4(mixedColor, fresnelFactor * 0.8);
  }
`;

const dataLineVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dataLineFragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;
  void main() {
    float position = vUv.x * 20.0 - time * 3.0; 
    float pulse = sin(position);
    float alpha = smoothstep(0.85, 1.0, pulse);
    float trail = max(0.0, pulse * 0.5); 
    vec3 finalColor = color + vec3(1.0) * alpha; 
    gl_FragColor = vec4(finalColor, max(trail, alpha) * 2.0);
    if (gl_FragColor.a < 0.01) discard;
  }
`;

// --- 3D COMPONENTS ---

const Globe = () => {
    const fresnelUniforms = useMemo(() => ({
        color1: { value: new THREE.Color("#06B6D4") }, // Cyan
        color2: { value: new THREE.Color("#020617") }, // Darker Navy
        bias: { value: 0.1 },
        scale: { value: 1.2 },
        power: { value: 2.5 },
    }), []);

    return (
        <group>
            {/* Base Sphere */}
            <mesh>
                <sphereGeometry args={[5, 64, 64]} />
                <meshPhongMaterial color="#02040A" emissive="#000000" specular="#222222" shininess={40} />
            </mesh>
            {/* Wireframe */}
            <mesh>
                <sphereGeometry args={[5.01, 32, 32]} />
                <meshBasicMaterial color="#0e7490" wireframe transparent opacity={0.1} />
            </mesh>
            {/* Glow */}
            <mesh>
                <sphereGeometry args={[5.2, 64, 64]} />
                <shaderMaterial
                    vertexShader={fresnelVertexShader}
                    fragmentShader={fresnelFragmentShader}
                    uniforms={fresnelUniforms}
                    transparent
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
};

const DataNetwork = () => {
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 45; i++) {
            const startLat = (Math.random() - 0.5) * 160;
            const startLon = (Math.random() - 0.5) * 360;
            const endLat = (Math.random() - 0.5) * 160;
            const endLon = (Math.random() - 0.5) * 360;
            const p1 = getPosition(startLat, startLon, 5);
            const p2 = getPosition(endLat, endLon, 5);
            const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(5 + p1.distanceTo(p2) * 0.6);
            temp.push(new THREE.QuadraticBezierCurve3(p1, mid, p2));
        }
        return temp;
    }, []);

    const matRef = useRef<THREE.ShaderMaterial>(null);
    useFrame((state) => {
        if (matRef.current) matRef.current.uniforms.time.value = state.clock.getElapsedTime();
    });

    return (
        <group>
            {lines.map((curve, i) => (
                <mesh key={i}>
                    <tubeGeometry args={[curve, 48, 0.015, 6, false]} />
                    <shaderMaterial
                        ref={i === 0 ? matRef : undefined} // Ref on first to drive uniforms, reuse would be better but this works for simple props
                        vertexShader={dataLineVertexShader}
                        fragmentShader={dataLineFragmentShader}
                        uniforms={{ time: { value: 0 }, color: { value: new THREE.Color("#A855F7") } }}
                        transparent
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

// --- MAIN 3D SCENE ---
const RotatingGroup = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y += 0.0008;
    });

    return (
        <group ref={groupRef} position={[0, -2, 0]}> {/* Offset down */}
            <Globe />
            <DataNetwork />
        </group>
    );
};

const GlobeScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 16], fov: 35 }}>
            <fog attach="fog" args={["#02040A", 12, 35]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[15, 15, 15]} intensity={1} color="#4f46e5" />
            <pointLight position={[-15, -10, -10]} intensity={0.8} color="#06b6d4" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            
            <RotatingGroup />
            
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.3} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI/3} />
        </Canvas>
    );
};


/**
 * UI COMPONENTS
 */

import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

import LanguageSwitch from "@/components/layout/LanguageSwitcher";

const InternalNavbar = () => {
    const t = useTranslations();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
                "w-[95%] max-w-7xl rounded-full px-6 py-3",
                "flex items-center justify-between",
                "backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/10",
                scrolled || isOpen ? "bg-[#0b0f19]/90" : "bg-white/5"
            )}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsOpen(false)}>
                   <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                       S
                   </div>
                   <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors hidden sm:block">
                       Sunpeak Tech
                   </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-6">
                    {siteConfig.mainNav.map((item) => (
                        <div key={item.title} className="relative group/nav">
                            <Link 
                                href={item.href} 
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1 py-2"
                            >
                               {t(item.title)}
                            </Link>
                            {item.items && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 min-w-[240px]">
                                    <div className="bg-[#0b0f19]/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 p-2 overflow-hidden">
                                        {item.items.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {t(subItem.title)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                     <LanguageSwitch />
                     <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-4 border border-white/20">
                        {t('nav.support')}
                    </Button>
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 font-medium">
                        {t('nav.get_quote')}
                    </Button>
                </div>

                 {/* Mobile Menu Toggle */}
                 <button 
                    className="lg:hidden text-white cursor-pointer p-2 z-50"
                    onClick={() => setIsOpen(!isOpen)}
                 >
                     {isOpen ? <X size={24} /> : <Menu size={24} />}
                 </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-40 bg-[#0b0f19]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
                    >
                        <div className="p-6 space-y-6">
                            {siteConfig.mainNav.map((item) => (
                                <div key={item.title} className="space-y-3">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-lg font-medium text-white"
                                    >
                                        {t(item.title)}
                                    </Link>
                                    {item.items && (
                                        <div className="pl-4 space-y-2 border-l-2 border-white/10">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-sm text-gray-400 hover:text-blue-400"
                                                >
                                                    {t(subItem.title)}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <div className="flex justify-start">
                                    <LanguageSwitch />
                                </div>
                                <Button className="w-full justify-start text-white hover:bg-white/10" variant="ghost" asChild>
                                    <Link href="/contact/support">{t('nav.support')}</Link>
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                    <Link href="/contact/request-a-consultation">{t('nav.get_quote')}</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


export function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#02040A]">
            {/* 1. 3D Background */}
            <div className="absolute inset-0 z-0">
                <GlobeScene />
            </div>

            {/* 2. Gradient Overlays for Readability */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_80%)]" />
            <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-b from-[#02040A]/40 via-transparent to-[#02040A]" />
            
            {/* 3. Atmospheric Glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen opacity-60" />

            {/* 4. Content */}
            <InternalNavbar />

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
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20 border-0">
                         Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 text-white hover:bg-white/5 hover:text-white backdrop-blur-md bg-white/5">
                         Request Consultation
                    </Button>
                </motion.div>

                {/* Trust Signal */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-20 flex flex-col items-center gap-4"
                >
                    <span className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Trusted by Industry Leaders</span>
                    <div className="flex items-center gap-8 opacity-40 grayscale mix-blend-screen">
                        {/* Placeholder Logos - simplified for pure CSS/SVG representation or text */}
                        <div className="h-8 w-24 bg-white/20 rounded-sm" /> 
                        <div className="h-8 w-8 rounded-full bg-white/20" />
                        <div className="h-8 w-32 bg-white/20 rounded-sm" /> 
                        <div className="h-10 w-10 rotate-45 bg-white/20 rounded-sm" />
                        <div className="h-8 w-28 bg-white/20 rounded-sm" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
