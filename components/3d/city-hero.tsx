"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Instance, Instances, Stars, Cloud, Float } from "@react-three/drei"
import * as THREE from "three"

const BUILDING_COUNT = 800 // Increased density for Bangkok feel
const CITY_SIZE = 80

export function CityHero() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Camera Drift - heavily slowed down for cinematic feel
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(t * 0.02) * 0.05 // Very subtle rotation
        groupRef.current.position.z = Math.sin(t * 0.03) * 1 // Gentle push
    }
  })

  // Procedural Building Data - Bangkok Density
  const buildings = useMemo(() => {
    return Array.from({ length: BUILDING_COUNT }).map((_, i) => {
        const x = (Math.random() - 0.5) * CITY_SIZE
        const z = (Math.random() - 0.5) * CITY_SIZE
        
        // Bangkok Logic: Dense clusters, some very tall skyscrapers
        const dist = Math.sqrt(x*x + z*z)
        let height = Math.random() * 5 + 2
        
        // Central Cluster (Sukumvit/Silom feel)
        if (dist < 15) height += Math.random() * 25
        if (dist < 30 && Math.random() > 0.8) height += Math.random() * 15 // Scattered high-rises
        
        const width = 1 + Math.random() * 2
        const depth = 1 + Math.random() * 2

        return {
            position: [x, height / 2, z] as [number, number, number],
            scale: [width, height, depth] as [number, number, number],
            // Deep blue/charcoal base, distinct from grid
            color: Math.random() > 0.95 ? "#001020" : "#050a10" 
        }
    })
  }, [])

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
        
        {/* 🏢 GENERAL SKYLINES (Instanced) */}
        <Instances range={BUILDING_COUNT}>
           <boxGeometry args={[1, 1, 1]} />
           <meshStandardMaterial 
             metalness={0.9} 
             roughness={0.1} 
             color="#020408"
             emissive="#000"
           />
           {buildings.map((data, i) => (
              <Instance 
                 key={i} 
                 position={data.position} 
                 scale={data.scale}
                 color={data.color}
              />
           ))}
        </Instances>

        {/* 🏙️ LANDMARKS (Simulated Bangkok Icons) */}
        
        {/* "Mahanakhon" Pixel Tower Style */}
        <Float speed={0} rotationIntensity={0} floatIntensity={0} position={[5, 15, -5]}>
           <mesh>
              <boxGeometry args={[4, 35, 4]} />
              <meshStandardMaterial color="#0a101a" metalness={0.8} roughness={0.2} />
           </mesh>
           {/* Pixel cuts */}
           <mesh position={[1, 5, 1]}>
              <boxGeometry args={[2.1, 4, 2.1]} />
              <meshBasicMaterial color="#00f0ff" wireframe />
           </mesh>
        </Float>

        {/* "Baiyoke" Tall Thin Tower Style */}
        <mesh position={[-8, 12, 5]}>
           <cylinderGeometry args={[1.5, 2, 30, 8]} />
           <meshStandardMaterial color="#080c14" metalness={0.9} />
        </mesh>


        {/* 🌐 IT GRID & CONNECTIVITY */}
        
        {/* Grid Lines tracing "Roads" */}
        <gridHelper args={[CITY_SIZE, 40, "#00f0ff", "#001830"]} position={[0, 0.1, 0]} />
        
        {/* Vertical Data Streams (Rising from buildings) */}
        {Array.from({ length: 15 }).map((_, i) => (
            <DataStream key={i} />
        ))}

        {/* Lateral City Data Connectors (Beams) */}
        {Array.from({ length: 8 }).map((_, i) => (
             <mesh key={`beam-${i}`} position={[(Math.random()-0.5)*40, Math.random()*15, (Math.random()-0.5)*40]} rotation={[0, Math.random()*Math.PI, 0]}>
                <boxGeometry args={[20, 0.05, 0.05]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
             </mesh>
        ))}

        {/* 🧠 SMART LAYERS */}
        
        {/* Warm Window Lights (The "Bangkok Night" feel) */}
        <Instances range={200}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffaa00" toneMapped={false} />
             {Array.from({ length: 200 }).map((_, i) => (
                <Instance 
                   key={i} 
                   position={[
                      (Math.random()-0.5)*CITY_SIZE, 
                      Math.random() * 15, // Varied heights
                      (Math.random()-0.5)*CITY_SIZE
                   ]} 
                />
             ))}
        </Instances>

        {/* Cloud Layer (Atmosphere) */}
        <Cloud opacity={0.2} speed={0.1} width={40} depth={20} segments={10} position={[0, 25, -20]} color="#050a14" />

        {/* Environment / Lighting */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
        <fog attach="fog" args={["#020408", 15, 90]} /> {/* Heavy Bangkok Haze */}
        
        <ambientLight intensity={0.2} color="#001020" />
        {/* Cyberpunk/Tech Lighting accents */}
        <pointLight position={[30, 20, 20]} intensity={1} color="#00f0ff" distance={60} />
        <pointLight position={[-30, 10, -30]} intensity={1} color="#bd00ff" distance={60} />
        {/* Warm city glow from below */}
        <pointLight position={[0, -10, 0]} intensity={0.5} color="#ffaa00" distance={50} />

    </group>
  )
}

function DataStream() {
   const x = (Math.random() - 0.5) * 40
   const z = (Math.random() - 0.5) * 40
   const height = 10 + Math.random() * 20
   
   const ref = useRef<THREE.Mesh>(null)
   useFrame((state) => {
      const t = state.clock.getElapsedTime()
      if (ref.current) {
         ref.current.position.y = (t * 2) % height
         ref.current.scale.y = 1 + Math.sin(t * 5) * 0.5
      }
   })

   return (
      <group position={[x, 0, z]}>
         {/* Static Line */}
         <mesh position={[0, height/2, 0]}>
             <boxGeometry args={[0.05, height, 0.05]} />
             <meshBasicMaterial color="#004466" transparent opacity={0.3} />
         </mesh>
         {/* Moving Pulse */}
         <mesh ref={ref}>
             <boxGeometry args={[0.15, 1, 0.15]} />
             <meshBasicMaterial color="#00f0ff" toneMapped={false} />
         </mesh>
      </group>
   )
}
