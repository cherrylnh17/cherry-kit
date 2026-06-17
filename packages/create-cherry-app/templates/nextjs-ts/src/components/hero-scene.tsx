"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import type { Mesh, Group } from "three";

function FloatingKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} castShadow position={[0, 0.2, 0]}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <meshStandardMaterial
          color="#b08968"
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>
    </Float>
  );
}

function OrbitingShapes() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[2.6, 0.8, -0.5]} castShadow>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#7f5539" roughness={0.3} metalness={0.4} />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={1.8}>
        <mesh position={[-2.7, -0.4, 0.4]} castShadow>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#ddb892" roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>
      <Float speed={2.2} floatIntensity={1.3}>
        <mesh position={[1.8, -1.1, 0.8]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#9c6644" roughness={0.35} metalness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <FloatingKnot />
        <OrbitingShapes />
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.35}
          scale={12}
          blur={2.6}
          far={4}
        />
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  );
}
