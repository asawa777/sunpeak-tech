"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

export function Scene({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Suspense fallback={null}>
            {children}
            <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
