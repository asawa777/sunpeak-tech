"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Icosahedron } from "@react-three/drei"
import * as THREE from "three"

export function Shield() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.5
    // meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.2
  })

  return (
    <group>
       <Icosahedron ref={meshRef} args={[1, 1]} scale={2}>
         <meshStandardMaterial color="#0064e0" wireframe />
       </Icosahedron>
       <Icosahedron args={[1, 1]} scale={1.8}>
         <meshBasicMaterial color="#002a60" transparent opacity={0.3} />
       </Icosahedron>
    </group>
  )
}
