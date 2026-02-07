"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * UTILITIES
 */

// Convert Lat/Lon to 3D position on sphere
const getPosition = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// Generate random points for data lines
const generateDataConnections = (count: number, radius: number) => {
  const connections = [];
  for (let i = 0; i < count; i++) {
    // Random Start Point
    const startLat = (Math.random() - 0.5) * 160;
    const startLon = (Math.random() - 0.5) * 360;
    const startPos = getPosition(startLat, startLon, radius);

    // Random End Point
    const endLat = (Math.random() - 0.5) * 160;
    const endLon = (Math.random() - 0.5) * 360;
    const endPos = getPosition(endLat, endLon, radius);

    // Control points for the curve (pulling them out away from the sphere center)
    const midPoint = startPos.clone().add(endPos).multiplyScalar(0.5);
    const distance = startPos.distanceTo(endPos);
    // The higher the arc, the further the distance
    const arcHeight = radius + distance * 0.5; 
    midPoint.normalize().multiplyScalar(arcHeight);

    // Create Curve
    const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
    connections.push(curve);
  }
  return connections;
};

/**
 * SHADERS
 */

// Fresnel Shader for Atomsphere Glow
const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionWorld;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPositionWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fresnelFragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform float bias;
  uniform float scale;
  uniform float power;
  
  varying vec3 vNormal;
  varying vec3 vPositionWorld;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPositionWorld);
    float fresnelFactor = bias + scale * pow(1.0 + dot(viewDirection, vNormal), power);
    fresnelFactor = clamp(fresnelFactor, 0.0, 1.0);
    
    vec3 mixedColor = mix(color2, color1, fresnelFactor);
    gl_FragColor = vec4(mixedColor, fresnelFactor * 0.6); // Adjust alpha for subtlety
  }
`;

// Data Line Shader for flowing pulse
const dataLineVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dataLineFragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    // Create a moving dash pattern
    float dashSize = 0.3;
    float gapSize = 0.7;
    float speed = 1.0;
    
    // Calculate position along the line (vUv.x is usually the length for TubeGeometry)
    float position = vUv.x * 20.0 - time * 5.0; // 20.0 repeats, 5.0 speed
    
    // Simple pulse
    float pulse = sin(position);
    
    // Make it sharp and bright
    float alpha = smoothstep(0.8, 1.0, pulse);
    
    // Gradient trail
    float trail = max(0.0, pulse); 
    
    // Combine base glow + pulse
    vec3 finalColor = color + vec3(1.0, 1.0, 1.0) * alpha; // Add white core to pulse
    
    gl_FragColor = vec4(finalColor, trail * 1.5); // Boost opacity of the trail
    
    if (gl_FragColor.a < 0.05) discard;
  }
`;


/**
 * COMPONENTS
 */

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Earth Parameters
  const radius = 5;

  // Frame Loop
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Slow rotation
    }
    if(glowRef.current) {
        // Ensure glow always faces camera if we were not using a sphere, 
        // but for sphere fresnel shader handles view direction.
    }
  });

  const fresnelUniforms = useMemo(() => ({
    color1: { value: new THREE.Color("#06B6D4") }, // Cyan
    color2: { value: new THREE.Color("#020617") }, // Darker
    bias: { value: 0.1 },
    scale: { value: 1.0 },
    power: { value: 2.0 },
  }), []);

  return (
    <group ref={groupRef}>
      {/* Main Dark Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial 
          color="#02040A" 
          emissive="#000000"
          specular="#111111"
          shininess={50}
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh>
        <sphereGeometry args={[radius + 0.01, 32, 32]} />
        <meshBasicMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Atmospheric Glow (Fresnel) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[radius + 0.2, 64, 64]} />
        <shaderMaterial 
          vertexShader={fresnelVertexShader}
          fragmentShader={fresnelFragmentShader}
          uniforms={fresnelUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} // Render on inside of slightly larger sphere for halo effect? Or FrontSide if just transparent?
          // For a rim glow on the outside, BackSide works well if we scale it up
        />
      </mesh>
    </group>
  );
};

const DataPulseLines = () => {
  const lines = useMemo(() => generateDataConnections(35, 5), []);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });
  
  return (
    <group rotation={[0, 0, 0]}>
       {lines.map((curve, index) => (
         <mesh key={index}>
           <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
           <shaderMaterial
             ref={materialRef}
             vertexShader={dataLineVertexShader}
             fragmentShader={dataLineFragmentShader}
             uniforms={{
               time: { value: 0 },
               color: { value: new THREE.Color("#A855F7") } // Neon Purple
             }}
             transparent
             blending={THREE.AdditiveBlending}
             depthWrite={false}
           />
         </mesh>
       ))}
    </group>
  );
};


const GlobeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-[#02040A]">
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
        <fog attach="fog" args={["#02040A", 10, 30]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <group>
            <Globe />
            {/* Rotate lines with globe or independently? usually they are part of the network */}
            {/* If we want them fixed to the globe, put inside Globe group, or rotate this group */}
            <GlobeAndLinesWrapper />
        </group>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

const GlobeAndLinesWrapper = () => {
   const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if(groupRef.current){
             groupRef.current.rotation.y += 0.0005;
        }
    })

    return (
        <group ref={groupRef}>
             {/* Data lines should move with the globe generally, or be independent? Requirements say "Global Connection"... usually static relative to globe surface. */}
             {/* However, the Globe component has its own rotation logic in my previous block. let's separate standard rotation. */}
             {/* Actually, let's remove rotation from Globe component and just rotate the wrapper for everything to stay in sync. */}
             
             {/* Wait, the implementation of Globe above had useFrame rotation. I should unify. */}
             {/* I will disable internal rotation in Globe and use this wrapper. */}
             
             <GlobeContent />
             <DataPulseLines />
        </group>
    )
}

// Extracted Globe Content without rotation logic to be parented
const GlobeContent = () => {
    // Earth Parameters
  const radius = 5;
  
  const fresnelUniforms = useMemo(() => ({
    color1: { value: new THREE.Color("#06B6D4") }, // Cyan
    color2: { value: new THREE.Color("#0056D2") }, // Royal Blue
    bias: { value: 0.1 },
    scale: { value: 2.0 },
    power: { value: 2.0 },
  }), []);

  return (
    <group>
      {/* Main Dark Globe */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial 
          color="#050a14" 
          emissive="#000000"
          specular="#222222"
          shininess={20}
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh>
        <sphereGeometry args={[radius + 0.02, 32, 32]} />
        <meshBasicMaterial 
          color="#38bdf8" 
          wireframe 
          transparent 
          opacity={0.08} 
        />
      </mesh>

       {/* Outer Glow Halo (BackSide Fresnel) */}
       <mesh>
        <sphereGeometry args={[radius + 0.2, 64, 64]} />
        <shaderMaterial 
          vertexShader={fresnelVertexShader}
          fragmentShader={fresnelFragmentShader}
          uniforms={fresnelUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  )
}

export default GlobeBackground;
