"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Center, Float, Sparkles, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

// Using a reliable CDN for the font
const FONT_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"

export function LogoHero() {
  const groupRef = useRef<THREE.Group>(null)

  // 🎥 CAMERA & MOTION: Slow cinematic push-in/drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
        // Subtle rotation for 3D depth perception
        groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
        groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.05
    }
    // Camera gentle float
    state.camera.position.z = 8 + Math.sin(t * 0.1) * 0.5
  })

  return (
    <group ref={groupRef}>
       
       {/* 🔷 LOGO & BRAND */}
       <Center>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
             <Text3D 
                font={FONT_URL} 
                size={1.5} 
                height={0.2} 
                curveSegments={12} 
                bevelEnabled 
                bevelThickness={0.02} 
                bevelSize={0.02} 
                bevelOffset={0} 
                bevelSegments={5}
             >
                SUNPEAK
                <meshStandardMaterial
                   color="#ffffff"
                   metalness={0.9}
                   roughness={0.1}
                />
             </Text3D>
             <Text3D 
                font={FONT_URL} 
                size={0.8} 
                height={0.1} 
                position={[0.2, -1.2, 0]}
                curveSegments={12} 
                bevelEnabled 
             >
                TECH
                {/* Material: Brushed metal + glass hybrid feel */}
                <meshPhysicalMaterial 
                    color="#00f0ff"
                    metalness={0.8}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    emissive="#004080"
                    emissiveIntensity={0.2}
                />
             </Text3D>
          </Float>
       </Center>

       {/* 🌐 TECHNOLOGY MOTIF (Subtle refined elements) */}
       
       {/* Floating Data Particles */}
       <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
       
       {/* Background Depth Particles (Stars) */}
       <Sparkles count={50} scale={20} size={5} speed={0.2} opacity={0.2} color="#bd00ff" />

       {/* Circuit Lines / Light Paths - Abstracted as thin rings */}
       <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
             <torusGeometry args={[5, 0.01, 16, 100]} />
             <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[0.5, 0, 0]}>
             <torusGeometry args={[7, 0.01, 16, 100]} />
             <meshBasicMaterial color="#bd00ff" transparent opacity={0.2} />
          </mesh>
       </group>


       {/* 💡 LIGHTING & ATMOSPHERE */}
       {/* Deep Black/Blue Gradient Environment */}
       <Environment preset="city" />
       
       {/* Controlled Highlights - Apple Style */}
       <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
       <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
       <spotLight position={[0, 5, 0]} intensity={2} angle={0.5} penumbra={1} color="#ffffff" distance={20} />
       
    </group>
  )
}
