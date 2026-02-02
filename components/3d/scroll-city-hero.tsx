"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances, Cloud, Float, Sparkles, CatmullRomLine } from "@react-three/drei"
import * as THREE from "three"

const CITY_SIZE = 100
const BUILDING_COUNT = 800

export function ScrollCityHero() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  
  // 🎞️ SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => {
       const maxScroll = window.innerHeight * 1.5 // Full effect over 1.5 viewports
       scrollRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((state) => {
     const t = state.clock.getElapsedTime()
     const scroll = scrollRef.current // 0 to 1

     // 🎥 MOTION & CAMERA ANIMATION
     // Scroll Start (0): Z=20, Y=30 (Wide High)
     // Scroll Mid (0.5): Z=10, Y=20 (Push)
     // Scroll Deep (1.0): Z=0, Y=10 (Mid-city height)
     
     // Target Camera Position (Lerped)
     const targetZ = 20 - (scroll * 20) 
     const targetY = 30 - (scroll * 20)
     
     // Smooth dampening towards target
     state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 5, 0.02) // Gentle sway
     state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
     state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
     state.camera.lookAt(0, 0, 0)

     // Group Rotation (Drift)
     if (groupRef.current) {
        groupRef.current.rotation.y = t * 0.02
     }
  })

  return (
    <group ref={groupRef}>
       {/* 🏙️ BANGKOK SKYLINE */}
       <BangkokSkyline />
       
       {/* 🌐 SCROLL-REACTIVE GRID LAYER */}
       <ReactiveGrid scrollRef={scrollRef} />

       {/* 🛣️ ELEVATED HIGHWAYS */}
       <Highways />

       {/* 🎨 ATMOSPHERE */}
       <Cloud opacity={0.3} speed={0.1} width={50} depth={20} position={[0, 15, -20]} color="#0a1525" />
       <fog attach="fog" args={["#020408", 10, 120]} />
       <ambientLight intensity={0.4} color="#001020" />
       <pointLight position={[30, 40, 20]} intensity={1} color="#00f0ff" distance={80} />
    </group>
  )
}

function BangkokSkyline() {
    // Procedural generation with Bangkok-style density
    const buildings = useMemo(() => Array.from({ length: BUILDING_COUNT }).map(() => {
        const x = (Math.random() - 0.5) * CITY_SIZE
        const z = (Math.random() - 0.5) * CITY_SIZE
        const dist = Math.sqrt(x*x + z*z)
        
        let h = Math.random() * 5 + 2
        let w = Math.random() + 0.5
        
        // Central Clusters (Sathorn/Silom)
        if (dist < 20) h += Math.random() * 20
        // Scattered Skyscrapers
        if (Math.random() > 0.98) h += 40 

        return {
            position: [x, h/2, z] as [number, number, number],
            scale: [w, h, w] as [number, number, number],
            color: Math.random() > 0.9 ? "#001830" : "#050a14"
        }
    }), [])

    return (
        <group>
             <Instances range={BUILDING_COUNT}>
                <boxGeometry />
                <meshStandardMaterial color="#050a14" metalness={0.8} roughness={0.2} />
                {buildings.map((b, i) => (
                    <Instance key={i} position={b.position} scale={b.scale} color={b.color} />
                ))}
             </Instances>
             
             {/* 🏙️ MAHANAKHON-STYLE PIXEL TOWER */}
             <Float speed={0} position={[10, 20, -10]}>
                 <mesh>
                     <boxGeometry args={[4, 50, 4]} />
                     <meshStandardMaterial color="#0a1520" metalness={0.9} roughness={0.1} />
                 </mesh>
                 {/* Pixel cutout effect */}
                 <mesh position={[1, 0, 1]} rotation={[0, Math.PI/4, 0]}>
                     <boxGeometry args={[3, 52, 3]} />
                     <meshBasicMaterial color="#000" wireframe opacity={0.1} transparent />
                 </mesh>
             </Float>
        </group>
    )
}

function ReactiveGrid({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
    const ref = useRef<THREE.Group>(null)
    const materialsRef = useRef<THREE.MeshBasicMaterial[]>([])
    
    // Grid Lines & Nodes
    const gridLines = useMemo(() => {
        // Create a grid of lines that sit on top of the "city" logic heights theoretically
        // For visual simplicity, horizontal grid at variable heights
        return Array.from({ length: 20 }).map((_, i) => ({
            y: Math.random() * 20 + 5,
            rot: Math.random() * Math.PI
        }))
    }, [])

    useFrame(() => {
        const scroll = scrollRef.current
        
        // Reactive Logic:
        // Scroll 0 -> Opacity 0.1 (Faint)
        // Scroll 1 -> Opacity 0.8 (Active)
        const intensity = 0.1 + (scroll * 0.7)
        
        if (ref.current) {
            // Pulse logic
            // We can't easily target all children materials without refs, 
            // but we can animate the whole group Opacity if using proper blending
        }
        
        materialsRef.current.forEach(mat => {
            mat.opacity = intensity
        })
    })

    return (
        <group ref={ref}>
             {/* 🌐 CONNECTIVITY MESH */}
             {gridLines.map((line, i) => (
                 <mesh key={i} position={[0, line.y, 0]} rotation={[0, line.rot, 0]}>
                     <torusGeometry args={[30 + i*2, 0.05, 16, 100]} />
                     <meshBasicMaterial 
                        ref={el => { if(el) materialsRef.current[i] = el }}
                        color="#00f0ff" 
                        transparent 
                        opacity={0.1} 
                     />
                 </mesh>
             ))}
             
             {/* ⏺️ NODES (On Rooftops) */}
             <Instances range={100}>
                 <sphereGeometry args={[0.3, 16, 16]} />
                 <meshBasicMaterial 
                    ref={el => { if(el) materialsRef.current[100] = el }}
                    color="#00f0ff" 
                    transparent 
                    opacity={0.1}
                 />
                 {Array.from({ length: 100 }).map((_, i) => (
                     <Instance 
                        key={i} 
                        position={[
                            (Math.random()-0.5)*CITY_SIZE, 
                            Math.random()*30 + 5, 
                            (Math.random()-0.5)*CITY_SIZE
                        ]} 
                     />
                 ))}
             </Instances>
        </group>
    )
}

function Highways() {
    // 🛣️ GLOWING ROADS
    const points = useMemo(() => [
        [new THREE.Vector3(-40, 5, -40), new THREE.Vector3(-10, 8, 0), new THREE.Vector3(40, 5, 40)],
        [new THREE.Vector3(40, 5, -40), new THREE.Vector3(10, 8, 0), new THREE.Vector3(-40, 5, 40)],
    ], [])
    
    return (
        <group>
            {points.map((path: any, i) => (
               <CatmullRomLine 
                  key={i} 
                  points={path} 
                  color="#ffaa00" 
                  lineWidth={3} 
                  opacity={0.6} 
                  transparent
               />
            ))}
        </group>
    )
}
