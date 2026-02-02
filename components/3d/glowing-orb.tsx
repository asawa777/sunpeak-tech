"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.2
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#0064e0"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}
