"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances, Cloud, Float, Environment, Sparkles } from "@react-three/drei"
import * as THREE from "three"

const CITY_SIZE = 220
const BUILDING_COUNT = 700

export function ScrollCityHero() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  
  // 🎞️ SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
       const maxScroll = window.innerHeight * 2.5
       scrollRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((state) => {
     const t = state.clock.getElapsedTime()
     const scroll = scrollRef.current // 0 to 1

     // 🎥 CAMERA & MOTION
     // Smooth parallax camera movement - Cinematic drift
     const targetZ = 45 - (scroll * 40) 
     const targetY = 30 - (scroll * 25)
     
     state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.02)
     state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.02)
     
     // Subtle drift
     state.camera.position.x = Math.sin(t * 0.05) * 5
     
     // Look slightly ahead
     state.camera.lookAt(0, -2, -20)

     // Slow City Rotation - Abstract Tech Feel
     if (groupRef.current) {
        groupRef.current.rotation.y = t * 0.02
     }
  })

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
       {/* 🏙️ ABSTRACT GLASS ARCHITECTURE */}
       <AbstractCity />
       
       {/* ✨ ATMOSPHERE & PARTICLES */}
       <Atmosphere />
       
       {/* 💡 LIGHTING RIG */}
       <LightingRig />
    </group>
  )
}

function LightingRig() {
    return (
        <group>
            {/* Dark Tech Ambient */}
            <ambientLight intensity={0.2} color="#0B1220" />
            
            {/* Primary Cyan Rim Light */}
            <directionalLight position={[50, 50, 50]} intensity={2} color="#00D1FF" />
            
            {/* Secondary Violet Fill */}
            <pointLight position={[-50, 20, -50]} intensity={3} color="#6B7CFF" distance={200} />
            
            {/* Bottom Glow (Data floor) */}
            <hemisphereLight args={["#001133", "#000000", 1]} />
        </group>
    )
}

function Atmosphere() {
    return (
        <group>
             {/* Background Sky - Midnight Blue */}
             <mesh scale={[500, 500, 500]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial side={THREE.BackSide} color="#0B1220" />
             </mesh>
             
             {/* Deep Midnight Fog */}
             <fogExp2 attach="fog" args={["#0B1220", 0.015]} />
             
             {/* Data Flow Dust - Cyan/Violet Mix */}
             <Sparkles count={400} scale={[200, 50, 200]} size={3} speed={0.4} opacity={0.5} color="#00D1FF" position={[0, 30, 0]} />
             <Sparkles count={200} scale={[150, 80, 150]} size={2} speed={0.2} opacity={0.3} color="#6B7CFF" position={[0, 40, 0]} />
        </group>
    )
}

function AbstractCity() {
    const { buildings, windows, edges } = useMemo(() => {
        const _buildings = []
        const _windows = []
        const _edges = [] // Edge highlights
        
        for(let i=0; i<BUILDING_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * CITY_SIZE * 0.7
            
            // Grid-like snapping
            const snap = 8
            const x = Math.round((Math.cos(angle) * radius) / snap) * snap
            const z = Math.round((Math.sin(angle) * radius) / snap) * snap
            
            const dist = Math.sqrt(x*x + z*z)
            
            // Height falls off with distance
            let h = Math.max(10, (80 - dist * 0.8) + (Math.random() * 30))
            let w = Math.random() * 3 + 2
            let d = Math.random() * 3 + 2

            if (dist < 20) { // Core
                h += 40
                w += 2
                d += 2
            }

            // Building Body (Translucent Cubes)
            _buildings.push({
                pos: [x, h/2, z] as [number, number, number],
                scale: [w, h, d] as [number, number, number],
                color: "#1A2233", 
            })

            // Data Points (Windows as Abstract Nodes)
            if (h > 15 && Math.random() > 0.3) {
                 const floors = Math.floor(h / 4)
                 
                 for(let f=0; f<floors; f++) {
                     if (Math.random() > 0.8) continue; // Sparse
                     
                     // Random Side
                     const wx = x + (Math.random()-0.5) * w * 1.02
                     const wz = z + (Math.random()-0.5) * d * 1.02
                     
                     // Color: Cyan (Data) or Violet (AI)
                     const tint = Math.random()
                     let wColor = "#00D1FF" 
                     if (tint > 0.7) wColor = "#6B7CFF"
                     if (tint > 0.95) wColor = "#ffffff" // Rare white spark

                     _windows.push({
                         pos: [wx, f*4 + 2, wz] as [number, number, number],
                         scale: [0.2, 0.2, 0.2] as [number, number, number], // Small dots
                         color: wColor
                     })
                 }
            }
        }
        return { buildings: _buildings, windows: _windows, edges: _edges }
    }, [])

    return (
        <group>
             {/* Buildings: Glass/Crystal Material */}
             <Instances range={buildings.length}>
                <boxGeometry />
                <meshPhysicalMaterial 
                    color="#0B1220" 
                    emissive="#1A2233"
                    emissiveIntensity={0.1}
                    metalness={0.9} 
                    roughness={0.1}
                    transmission={0.6} // Glass effect
                    thickness={2}
                    envMapIntensity={2}
                    clearcoat={1}
                />
                {buildings.map((b, i) => (
                    <Instance key={i} position={b.pos} scale={b.scale} />
                ))}
             </Instances>

             {/* Data Nodes: Glowing Points */}
             <Instances range={windows.length}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial toneMapped={false} />
                {windows.map((w, i) => (
                    <Instance key={i} position={w.pos} scale={w.scale} color={w.color} />
                ))}
             </Instances>
        </group>
    )
}
