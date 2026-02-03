"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances, Cloud, Float, Environment, Sparkles } from "@react-three/drei"
import * as THREE from "three"

const CITY_SIZE = 200
const BUILDING_COUNT = 600

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

     // Slow City Rotation
     if (groupRef.current) {
        groupRef.current.rotation.y = t * 0.015
     }
  })

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
       {/* 🏙️ REALISTIC ARCHITECTURE */}
       <RealisticCity />
       
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
            {/* Soft Ambient - City Night Glow */}
            <ambientLight intensity={0.6} color="#1a253a" />
            
            {/* Moon/City directional light */}
            <directionalLight position={[100, 100, 50]} intensity={1.5} color="#dbeeff" castShadow />
            
            {/* Horizon Fill (Warmth from city below) */}
            <hemisphereLight args={["#1a253a", "#050a10", 1]} />
            
            {/* Key Edge Light */}
            <spotLight position={[-50, 80, 20]} angle={0.5} penumbra={1} intensity={2} color="#4466aa" />
        </group>
    )
}

function Atmosphere() {
    return (
        <group>
             {/* Background Sky Gradient */}
             <mesh scale={[500, 500, 500]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial side={THREE.BackSide} color="#020408" />
             </mesh>
             
             {/* Distant Haze */}
             <fogExp2 attach="fog" args={["#030712", 0.012]} />
             
             {/* Subtle "Data Dust" - Not glowing, just floating */}
             <Sparkles count={300} scale={[150, 50, 150]} size={2} speed={0.2} opacity={0.3} color="#aaddff" position={[0, 20, 0]} />
        </group>
    )
}

function RealisticCity() {
    const { buildings, windows, details } = useMemo(() => {
        const _buildings = []
        const _windows = []
        const _details = []
        
        for(let i=0; i<BUILDING_COUNT; i++) {
            // Distribution: Dense center, spreading out
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * CITY_SIZE * 0.7
            // Bias towards slightly linear streets for "block" feel
            const x = Math.round((Math.cos(angle) * radius) / 4) * 4 + (Math.random() - 0.5) * 1.5
            const z = Math.round((Math.sin(angle) * radius) / 4) * 4 + (Math.random() - 0.5) * 1.5
            
            const dist = Math.sqrt(x*x + z*z)
            
            // Height falls off with distance
            let h = Math.max(8, (70 - dist * 0.8) + (Math.random() * 20))
            let w = Math.random() * 2 + 1.5
            let d = Math.random() * 2 + 1.5

            if (dist < 20) { // Core
                h += 30
                w += 1.5
                d += 1.5
            }

            // VARIATION 1: Main Tower Body
            const isGlass = Math.random() > 0.3
            _buildings.push({
                pos: [x, h/2, z] as [number, number, number],
                scale: [w, h, d] as [number, number, number],
                color: isGlass ? "#0a1525" : "#111822", // Dark Blue Glass or Dark Concrete
                isGlass
            })

            // VARIATION 2: Rooftop Details (HVAC/Antenna)
            if (h > 15) {
                const detH = Math.random() * 2 + 0.5
                const detW = w * (0.3 + Math.random() * 0.4)
                _details.push({
                    pos: [x + (Math.random()-0.5)*w*0.5, h + detH/2, z + (Math.random()-0.5)*d*0.5] as [number, number, number],
                    scale: [detW, detH, detW] as [number, number, number],
                    color: "#1a1f29" // Dark grey mechanism
                })
                
                // Antenna Spike
                if (Math.random() > 0.7) {
                    _details.push({
                         pos: [x, h + 5, z] as [number, number, number],
                         scale: [0.1, 10, 0.1] as [number, number, number],
                         color: "#556677"
                    })
                    // Red Aircraft Light
                    if (h > 60) {
                        _details.push({
                            pos: [x, h + 10, z] as [number, number, number],
                            scale: [0.3, 0.3, 0.3] as [number, number, number],
                            color: "#ff0000",
                            emissive: "#ff0000"
                        })
                    }
                }
            }

            // VARIATION 3: Realistic Windows
            // Not every building is lit. Not every floor is lit.
            if (h > 10 && Math.random() > 0.2) {
                 const floors = Math.floor(h / 2.5)
                 const sides = 4
                 
                 for(let f=0; f<floors; f++) {
                     // Random "Floor" check - some floors dark
                     if (Math.random() > 0.6) continue;
                     
                     // For each side roughly (simplified placement)
                     for(let s=0; s<2; s++) { // Only do front/back for density perf
                        if (Math.random() > 0.5) continue;
                        
                        const wx = x + (Math.random()-0.5) * w * 1.05
                        const wz = z + (Math.random()-0.5) * d * 1.05
                        
                        // Color Variance: Warm (Office), Cool (Server), Blue (Lobby)
                        const tint = Math.random()
                        let wColor = "#ffeedd" // Warm
                        if (tint > 0.6) wColor = "#dbeeff" // Cool
                        if (tint > 0.9) wColor = "#aaddff" // Blueish

                        _windows.push({
                            pos: [wx, f*2.5 + 4, wz] as [number, number, number],
                            scale: [0.4, 0.8, 0.1] as [number, number, number], // Tall window shape
                            color: wColor
                        })
                     }
                 }
            }
        }
        return { buildings: _buildings, windows: _windows, details: _details }
    }, [])

    return (
        <group>
             {/* Main Buildings - Glass & Concrete */}
             <Instances range={buildings.length}>
                <boxGeometry />
                <meshStandardMaterial 
                    color="#0a1525" 
                    metalness={0.9} 
                    roughness={0.1}
                    envMapIntensity={1.5}
                />
                {buildings.map((b, i) => (
                    <Instance key={i} position={b.pos} scale={b.scale} color={b.color} />
                ))}
             </Instances>
             
             {/* Rooftop Details - Matte */}
             <Instances range={details.length}>
                <boxGeometry />
                <meshStandardMaterial color="#222222" metalness={0.4} roughness={0.8} />
                {details.map((d, i) => (
                    <Instance key={i} position={d.pos} scale={d.scale} color={d.color} />
                ))}
             </Instances>

             {/* Windows - Emissive */}
             <Instances range={windows.length}>
                <boxGeometry />
                <meshBasicMaterial toneMapped={false} />
                {windows.map((w, i) => (
                    <Instance key={i} position={w.pos} scale={w.scale} color={w.color} />
                ))}
             </Instances>
        </group>
    )
}
