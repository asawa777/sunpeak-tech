"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

// We will use remote textures for better realism as local ones are not available.
const EARTH_DAY_MAP = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const EARTH_NIGHT_MAP = "//unpkg.com/three-globe/example/img/earth-night.jpg";
const EARTH_TOPOGRAPHY = "//unpkg.com/three-globe/example/img/earth-topology.png";

// Shaders
const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(0.39, 1.0, 0.85, 1.0) * intensity * 2.0; // Boosted Cyan Glow
}
`;

const gridVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const gridFragmentShader = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Pulse effect based on time and UV
  float pulse = sin(time * 3.0 + vUv.y * 20.0) * 0.5 + 0.5;
  
  // Base alpha
  float alpha = 0.1 + pulse * 0.6;
  
  // Add some vertical scanning lines
  float scan = step(0.98, sin(vUv.y * 100.0 + time * 5.0));
  alpha += scan * 0.5;

  gl_FragColor = vec4(color, alpha);
  if (gl_FragColor.a < 0.05) discard;
}
`;

// Helper for Arc Lines
const getPosition = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const ArcLines = ({ count = 15, radius = 5 }) => {
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Random major cities approximation
            const startLat = (Math.random() - 0.5) * 140; 
            const startLon = (Math.random() - 0.5) * 360;
            const endLat = (Math.random() - 0.5) * 140;
            const endLon = (Math.random() - 0.5) * 360;
            
            const p1 = getPosition(startLat, startLon, radius);
            const p2 = getPosition(endLat, endLon, radius);
            
            // Higher arc for longer distances
            const dist = p1.distanceTo(p2);
            const midHeight = radius + dist * 0.5;
            const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(midHeight);
            
            const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
            temp.push(curve);
        }
        return temp;
    }, [count, radius]);

    // Animated particles along curves
    const particleRef = useRef<THREE.InstancedMesh>(null);
    const particleCount = count * 3; // 3 particles per line
    
    useFrame((state) => {
        if (!particleRef.current) return;
        const time = state.clock.getElapsedTime();
        const dummy = new THREE.Object3D();
        
        let idx = 0;
        lines.forEach((curve, i) => {
            for(let j=0; j<3; j++) {
                // Offset time for each particle
                const t = (time * 0.5 + j * 0.3 + i * 0.1) % 1; 
                const pos = curve.getPoint(t);
                dummy.position.copy(pos);
                dummy.scale.setScalar(0.08); // Size of particle
                dummy.updateMatrix();
                particleRef.current!.setMatrixAt(idx++, dummy.matrix);
            }
        });
        particleRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            {/* The Lines themselves */}
            {lines.map((curve, i) => (
                <mesh key={i}>
                    <tubeGeometry args={[curve, 48, 0.01, 8, false]} />
                    <meshBasicMaterial color="#64ffda" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
            
            {/* The moving particles */}
            <instancedMesh ref={particleRef} args={[undefined, undefined, particleCount]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </instancedMesh>
        </group>
    );
};


export function VividGlobe() {
  const [colorMap, specularMap, bumpMap] = useLoader(TextureLoader, [EARTH_DAY_MAP, EARTH_DAY_MAP, EARTH_TOPOGRAPHY]);
  
  const gridMatRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const gridUniforms = useMemo(() => ({
      time: { value: 0 },
      color: { value: new THREE.Color("#ff9f1c") } // Deep Orange
  }), []);

  useFrame((state) => {
      if (gridMatRef.current) {
          gridMatRef.current.uniforms.time.value = state.clock.getElapsedTime();
      }
      if (groupRef.current) {
          groupRef.current.rotation.y += 0.001; // Slow rotation
      }
  });

  return (
    <group ref={groupRef}>
      {/* 1. LAYER 1: THE CORE (Realistic Earth - Vivid Blue) */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshPhongMaterial 
            map={colorMap} 
            specularMap={specularMap} 
            bumpMap={bumpMap}
            bumpScale={0.08}
            specular={new THREE.Color("#004080")} 
            shininess={25}
            color="#002855" // Vivid Navy Tint
            emissive="#001020" // Slight self-illumination
            emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. LAYER 2: THE ATMOSPHERE (Cyan Glow) */}
      <mesh scale={[1.15, 1.15, 1.15]}> {/* Slightly larger for softer falloff */}
        <sphereGeometry args={[5, 64, 64]} />
        <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent
            depthWrite={false}
        />
      </mesh>

      {/* 3. LAYER 3: REMOVED GRID (Holographic Crystal Look) */}
      
      {/* 4. LAYER 4: CONNECTIVITY ARC LINES */}
      <ArcLines count={30} radius={5} />

    </group>
  );
}
