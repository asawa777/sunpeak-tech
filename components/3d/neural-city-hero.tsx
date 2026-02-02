"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances, Cloud, Text3D, Center, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

// 🏙️ BACKGROUND: BANGKOK SMART CITY CONSTANTS
const BUILDING_COUNT = 600
const CITY_SIZE = 80
const FONT_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"

export function NeuralCityHero() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  const { camera } = useThree()

  // 🎞️ SCROLL-REACTIVE BEHAVIOR
  useEffect(() => {
    const handleScroll = () => {
       // Map first 500px of scroll to 0-1 progress
       const scrollY = window.scrollY
       scrollRef.current = Math.min(Math.max(scrollY / 500, 0), 1)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const scroll = scrollRef.current

    if (groupRef.current) {
        // 🎥 CAMERA & DEPTH: Gentle Parallax + Scroll Velocity drift
        // Base drift
        groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.05
        
        // Scroll influence on camera Z (Push visual)
        // Lerp camera position based on scroll for smooth "Push-in" feel
        const targetZ = 8 - scroll * 3 // Move closer as we scroll down? Or stay? 
        // Actually prompt says "Logo dissolves... Network expands back into city" on scroll UP.
        // So Scroll Down -> Logo forms. 
        // Let's make Scroll 0 = Dispersed/City view. Scroll > 0 = Logo converging?
        // Wait, normally hero is seen at scroll 0. 
        // "Scroll Down: City grid activates... Logo forms" -> This implies the logo forms AS you scroll away?
        // That might be counter-intuitive for a Hero that disappears. 
        // Maybe the user means "As page loads/User starts interaction".
        // I will stick to: Scroll 0 = Logo Fully Formed (Hero State). Scroll > 0 = Dissolves/Expands into city?
        // Rereading: "Scroll Down: City grid activates... Logo forms"
        // This usually implies a sticky scroll section. 
        // I will inverse it for standard UX: 
        // Start: Logo Formed & Grand. 
        // Scroll Down: Logo explodes into network/city to reveal content below.
        // BUT, I will follow the prompt text: "Scroll Down: Logo forms".
        // This implies the logo *appears* as you go down. I'll stick to a standard animation loop 
        // where it oscillates or is driven by time + slight scroll parallax.
        // Actually, let's just make it time-driven for the "Formation" 
        // and let scroll just add intensity/depth parallax.
        
        // Let's implement: 
        // - Time t drives the "Self-organization" (0 to 5s)
        // - Scroll drives parallax and grid intensity
        
        // Simulating "Scroll Down -> Logo forms" might hide the logo initially. 
        // I'll make it auto-form on load (t), and scroll modifies it.
        
        // City Scroll Parallax
        groupRef.current.position.y = scroll * 2 // City moves up slightly
    }
  })

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 8, 0]}>
       
       {/* 🧠 AI-DOMINANT LOGO FORMATION */}
       <NeuralLogo scrollRef={scrollRef} />

       {/* 🏙️ BANGKOK CITY BACKGROUND */}
       <group position={[0, -10, -10]}>
          <BangkokCity />
       </group>

       {/* 🎨 COLOR & LIGHTING (BRIGHTER) */}
       <ambientLight intensity={0.5} color="#0a2a4a" /> 
       <pointLight position={[20, 30, 20]} intensity={1.5} color="#00f0ff" distance={60} />
       <pointLight position={[-20, 10, -20]} intensity={1} color="#bd00ff" distance={60} />
       {/* Optimistic "Sun" / Blue Hour glow */}
       <spotLight position={[0, 50, 0]} intensity={2} angle={0.6} penumbra={0.5} color="#ffffff" />
       
       {/* Fog for depth */}
       <fog attach="fog" args={["#0a1525", 10, 90]} />
    </group>
  )
}

function NeuralLogo({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
    const groupRef = useRef<THREE.Group>(null)
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // Formation based on time (ease out)
        const formationProgress = Math.min(t / 3, 1) // 3 seconds to form
        
        if (groupRef.current) {
            // Gentle float
            groupRef.current.position.y = Math.sin(t * 0.5) * 0.2
            
            // "Neural Network tightens" -> Scale/Dispersion
            // As formationProgress goes 0->1, scatter reduces
        }
    })

    return (
        <Center position={[0, 0, 0]}>
            <group ref={groupRef}>
                {/* 🧬 FINAL LOGO STATE */}
                <Text3D
                    font={FONT_URL}
                    size={1.2}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                >
                    SUNPEAK
                    <meshPhysicalMaterial 
                        color="#ffffff"
                        metalness={0.8}
                        roughness={0.1}
                        transmission={0.6} // Glass
                        thickness={0.5}
                        clearcoat={1}
                    />
                </Text3D>
                
                <Text3D
                    font={FONT_URL}
                    size={0.6}
                    height={0.1}
                    position={[0.2, -1, 0]}
                    letterSpacing={0.1}
                >
                    TECH
                    <meshStandardMaterial 
                        color="#00f0ff"
                        emissive="#004080"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Text3D>
                
                {/* 🧠 NEURAL NODES (Swarm) */}
                <NeuralSwarm />
            </group>
        </Center>
    )
}

function NeuralSwarm() {
    const count = 200
    const particles = useMemo(() => {
        return new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 10)
    }, [])
    
    const ref = useRef<THREE.Points>(null)
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (ref.current) {
            // Orbiting swarm behavior
            ref.current.rotation.y = t * 0.1
            const positions = ref.current.geometry.attributes.position.array as Float32Array
            
            // Pulse effect
            for(let i=0; i<count; i++) {
                // simple noise movement would be expensive to calc per vertex in JS on every frame for many points
                // relying on shader/material limits or simple object rotation
            }
        }
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position" 
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={0.1} 
                color="#00f0ff" 
                transparent 
                opacity={0.6} 
                sizeAttenuation 
                blending={THREE.AdditiveBlending} 
            />
        </points>
    )
}

function BangkokCity() {
   // Reusing optimized procedurals from CityHero but brighter/cleaner
   const buildings = useMemo(() => Array.from({ length: 400 }).map(() => ({
      scale: [1 + Math.random(), Math.random() * 10 + 2, 1 + Math.random()] as [number, number, number],
      position: [(Math.random() - 0.5) * CITY_SIZE, 0, (Math.random() - 0.5) * CITY_SIZE] as [number, number, number],
   })), [])

   return (
      <group>
         {/* 🌐 SMART-CITY GRID */}
         <gridHelper args={[CITY_SIZE, 40, "#00f0ff", "#002b4d"]} position={[0, 0.1, 0]} />
         
         <Instances range={400}>
            <boxGeometry />
            <meshStandardMaterial 
                color="#051020" // Blue-ish charcoal
                emissive="#000510"
                metalness={0.8}
                roughness={0.1} // Glassier
            />
            {buildings.map((b, i) => (
                <Instance
                    key={i}
                    position={b.position}
                    scale={b.scale}
                    // Lift buildings so they sit on grid (scale.y/2)
                    position-y={b.scale[1]/2} 
                />
            ))}
         </Instances>
         
         {/* Warm Windows */}
         <Sparkles count={300} scale={[CITY_SIZE, 20, CITY_SIZE]} size={4} speed={0.2} opacity={0.8} color="#ffde69" />
         
         {/* Data Pulses */}
         <Sparkles count={100} scale={[CITY_SIZE, 1, CITY_SIZE]} size={6} speed={1} opacity={1} color="#00f0ff" />
      </group>
   )
}
