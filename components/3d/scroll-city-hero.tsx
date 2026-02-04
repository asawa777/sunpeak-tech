"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Instance, Instances, Sparkles, Html } from "@react-three/drei"
import * as THREE from "three"

const CITY_SIZE = 220
const BUILDING_COUNT = 700

export function ScrollCityHero() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 30, 45], fov: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}
        dpr={[1, 2]} // Performance optimization
      >
        <CityScene />
      </Canvas>
    </div>
  )
}

function CityScene() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
       // Limit scroll effect calculation
       const maxScroll = window.innerHeight * 2.5
       scrollRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((state) => {
     const t = state.clock.getElapsedTime()
     const scroll = scrollRef.current

     // Camera Logic (Cinematic)
     const targetZ = 45 - (scroll * 40) 
     const targetY = 30 - (scroll * 25)
     
     state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
     state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
     state.camera.position.x = Math.sin(t * 0.05) * 5
     state.camera.lookAt(0, -2, -20)

     if (groupRef.current) {
        groupRef.current.rotation.y = t * 0.02
     }
  })

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
       {/* 🏙️ WHITE GLASS CITY */}
       <AbstractCity />
       
       {/* ✨ ATMOSPHERE (Blue Haze) */}
       <Atmosphere />
       
       {/* 💡 DAYLIGHT RIG */}
       <LightingRig />
    </group>
  )
}

function LightingRig() {
    return (
        <group>
            {/* White Ambient - Daylight */}
            <ambientLight intensity={1.2} color="#ffffff" />
            
            {/* Sun Light (Warm White) */}
            <directionalLight position={[100, 100, 50]} intensity={2.5} color="#fffcf0" castShadow />
            
            {/* Blue Fill (Sky Reflection) */}
            <hemisphereLight args={["#ffffff", "#2563EB", 1]} />
        </group>
    )
}

function Atmosphere() {
    return (
        <group>
             {/* Background Gradient (Royal Blue) */}
             <mesh scale={[500, 500, 500]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial side={THREE.BackSide} color="#2563EB" /> 
             </mesh>
             
             {/* Bright Cyan Fog */}
             <fogExp2 attach="fog" args={["#2563EB", 0.015]} />
             
             {/* White Data Particles */}
             <Sparkles count={400} scale={[200, 50, 200]} size={3} speed={0.4} opacity={0.6} color="#ffffff" position={[0, 30, 0]} />
        </group>
    )
}

function AbstractCity() {
    const { buildings, windows } = useMemo(() => {
        const _buildings = []
        const _windows = []
        
        for(let i=0; i<BUILDING_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * CITY_SIZE * 0.7
            
            const snap = 8
            const x = Math.round((Math.cos(angle) * radius) / snap) * snap
            const z = Math.round((Math.sin(angle) * radius) / snap) * snap
            
            const dist = Math.sqrt(x*x + z*z)
            
            let h = Math.max(10, (80 - dist * 0.8) + (Math.random() * 30))
            let w = Math.random() * 3 + 2
            let d = Math.random() * 3 + 2

            if (dist < 20) { 
                h += 40
                w += 2
                d += 2
            }

            // BUILDING: White Glass
            _buildings.push({
                pos: [x, h/2, z] as [number, number, number],
                scale: [w, h, d] as [number, number, number],
            })

            // ACCENTS: Blue Lights
            if (h > 15 && Math.random() > 0.3) {
                 const floors = Math.floor(h / 4)
                 for(let f=0; f<floors; f++) {
                     if (Math.random() > 0.8) continue; 
                     const wx = x + (Math.random()-0.5) * w * 1.02
                     const wz = z + (Math.random()-0.5) * d * 1.02
                     _windows.push({
                         pos: [wx, f*4 + 2, wz] as [number, number, number],
                         scale: [0.2, 0.2, 0.2] as [number, number, number],
                         color: "#67e8f9" // Cyan
                     })
                 }
            }
        }
        return { buildings: _buildings, windows: _windows }
    }, [])

    return (
        <group>
             {/* White Glass Material */}
             <Instances range={buildings.length}>
                <boxGeometry />
                <meshPhysicalMaterial 
                    color="#ffffff" 
                    emissive="#2563EB"
                    emissiveIntensity={0.2}
                    metalness={0.1} 
                    roughness={0.05}
                    transmission={0.2} // Slight transparency/frosted
                    thickness={1}
                    envMapIntensity={2}
                />
                {buildings.map((b, i) => (
                    <Instance key={i} position={b.pos} scale={b.scale} />
                ))}
             </Instances>

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
