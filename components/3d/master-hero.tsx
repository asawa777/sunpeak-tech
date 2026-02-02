"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Icosahedron, Torus, Stars, Sphere, Trail } from "@react-three/drei"
import * as THREE from "three"

// 🎛 GLOBAL SYSTEM RULES
// Perfect loop: 20s
// Base Colors
const COLORS = {
   dark: "#0a0a10",
   cyan: "#00f0ff",
   violet: "#bd00ff",
   amber: "#ff9000",
}

export function MasterHero() {
  const groupRef = useRef<THREE.Group>(null)

  // System Heartbeat
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
        // Slow orbital drift
        groupRef.current.rotation.y = t * 0.05
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
       {/* 🧠 CORE SYSTEM (Central Intelligence) */}
       <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Inner Core */}
          <mesh>
             <dodecahedronGeometry args={[1.5, 0]} />
             <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.1} 
                metalness={1} 
                emissive={COLORS.cyan}
                emissiveIntensity={0.2}
             />
          </mesh>
          {/* Wireframe Shell */}
          <mesh scale={1.6}>
             <icosahedronGeometry args={[1, 1]} />
             <meshBasicMaterial color={COLORS.cyan} wireframe transparent opacity={0.15} />
          </mesh>
       </Float>

       {/* 2️⃣ AI Intelligence Component (Orbiting Lattices) */}
       <group rotation={[0.5, 0.5, 0]}>
          <RingOrbit radius={4} speed={0.2} color={COLORS.cyan} />
          <RingOrbit radius={5.5} speed={-0.15} color={COLORS.violet} />
       </group>

       {/* 4️⃣ Cybersecurity Component (Shields) */}
       <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
         <torusGeometry args={[7, 0.02, 16, 100]} />
         <meshBasicMaterial color={COLORS.violet} transparent opacity={0.3} />
       </mesh>

       {/* 1️⃣ Data Flow Component (Pulsing Trails) */}
       <DataStreams count={8} color={COLORS.amber} radius={3} />

       {/* 3️⃣ Cloud Infrastructure (Volumetric Particles) */}
       <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

       {/* 5️⃣ Telecom / Network Component (Distant Rails) */}
       <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100, 20, 20]} />
          <meshBasicMaterial color={COLORS.dark} wireframe transparent opacity={0.05} />
       </mesh>
       
       {/* Ambient Light Field */}
       <pointLight position={[10, 10, 10]} intensity={1.5} color={COLORS.cyan} distance={20} />
       <pointLight position={[-10, -5, -10]} intensity={1} color={COLORS.violet} distance={20} />
    </group>
  )
}

function RingOrbit({ radius, speed, color }: { radius: number, speed: number, color: string }) {
   const ref = useRef<THREE.Mesh>(null)
   useFrame((state) => {
      if (ref.current) {
         ref.current.rotation.z += speed * 0.01
         ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      }
   })
   return (
      <mesh ref={ref}>
         <torusGeometry args={[radius, 0.05, 16, 100]} />
         <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
   )
}

function DataStreams({ count, color, radius }: { count: number, color: string, radius: number }) {
   const trails = Array.from({ length: count }).map((_, i) => ({
      speed: 0.5 + Math.random(),
      offset: Math.random() * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 4
   }))

   return (
      <group>
         {trails.map((t, i) => (
            <DataParticle key={i} {...t} color={color} radius={radius} />
         ))}
      </group>
   )
}

function DataParticle({ speed, offset, yOffset, color, radius }: { speed: number, offset: number, yOffset: number, color: string, radius: number }) {
   const ref = useRef<THREE.Mesh>(null)
   useFrame((state) => {
      const t = state.clock.getElapsedTime() * speed + offset
      if (ref.current) {
         ref.current.position.x = Math.cos(t) * radius
         ref.current.position.z = Math.sin(t) * radius
         ref.current.position.y = Math.sin(t * 0.5) + yOffset
      }
   })
   return (
      <mesh ref={ref}>
         <sphereGeometry args={[0.05, 8, 8]} />
         <meshBasicMaterial color={color} />
      </mesh>
   )
}
