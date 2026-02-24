"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

interface Canvas3DProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Futuristic 3D Canvas for the NextGen Portfolio
 * Provides the Three.js Scene with cinematic lighting and atmosphere
 */
export default function Canvas3D({ children, className = "" }: Canvas3DProps) {
  return (
    <div
      className={`w-full h-screen bg-linear-to-b from-slate-400 via-slate-500 to-slate-600 ${className}`}
      data-testid="3d-canvas"
    >
      <Canvas
        camera={{
          position: [0, 12, 15],
          fov: 45,
        }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        {/* Cinematic Lighting Setup (like in screenshots) */}
        <ambientLight intensity={2.5} color="#ffffff" />

        {/* Main directional light */}
        <directionalLight
          position={[10, 20, 10]}
          intensity={5.0}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Multiple bright lights from different angles */}
        <directionalLight
          position={[-10, 20, -10]}
          intensity={3.0}
          color="#ffffff"
        />
        <directionalLight
          position={[0, 25, 0]}
          intensity={4.0}
          color="#ffffff"
        />

        {/* Accent lighting for atmosphere */}
        <pointLight
          position={[0, 15, 0]}
          intensity={4.0}
          color="#ffffff"
          distance={50}
        />
        <pointLight
          position={[-15, 10, -15]}
          intensity={3.0}
          color="#ffffff"
          distance={40}
        />
        <pointLight
          position={[15, 10, 15]}
          intensity={3.0}
          color="#ffffff"
          distance={40}
        />
        <pointLight
          position={[0, 10, 20]}
          intensity={3.0}
          color="#ffffff"
          distance={40}
        />
        <pointLight
          position={[0, 10, -20]}
          intensity={3.0}
          color="#ffffff"
          distance={40}
        />

        {/* Rim lighting */}
        <spotLight
          position={[0, 20, -25]}
          angle={Math.PI / 2}
          penumbra={0.5}
          intensity={4.0}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />
        <spotLight
          position={[20, 15, 0]}
          angle={Math.PI / 2}
          penumbra={0.5}
          intensity={3.0}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />
        <spotLight
          position={[-20, 15, 0]}
          angle={Math.PI / 2}
          penumbra={0.5}
          intensity={3.0}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />

        {/* Orbit Controls auch in Production, damit Nutzer die Szene wie lokal drehen/zoomen können */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={8}
          maxDistance={30}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />

        {/* 3D-Komponenten */}
        <Suspense fallback={null}>{children}</Suspense>

        {/* Entferne die Sphere - kein Deckel/Decke mehr! */}
      </Canvas>
    </div>
  );
}
