"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder } from "@react-three/drei";
import { Mesh, Group, Vector3 } from "three";
import * as THREE from "three";

interface LoadingSequenceProps {
  onComplete: () => void;
}

// 3D-Würfel Komponente
interface AnimatedCubeProps {
  sequence: number;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ sequence }) => {
  const cubeRef = useRef<Mesh>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  // Helper function für lineare Interpolation
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!cubeRef.current) return;

    const time = clock.getElapsedTime();

    if (sequence === 0 && startAnimation) {
      // Sequenz 1: Würfel fällt langsamer von oben
      const fallProgress = Math.min(time / 4, 1); // Langsamerer Fall (4 Sekunden statt 2.5)
      const easeInQuart =
        fallProgress * fallProgress * fallProgress * fallProgress;

      cubeRef.current.position.y = 8 - easeInQuart * 8;
      cubeRef.current.position.x = Math.sin(time * 2) * 0.4; // Langsamere Pendelbewegung
      cubeRef.current.rotation.x = time * 2; // Langsamere Rotationen
      cubeRef.current.rotation.y = time * 1.5;
      cubeRef.current.rotation.z = time * 1;

      const scale = 0.3 + fallProgress * 0.5;
      cubeRef.current.scale.setScalar(scale);
    } else if (sequence === 1 && startAnimation) {
      // Sequenz 2: Würfel integriert sich in CPU, bleibt als Bestandteil sichtbar
      const integrationProgress = Math.min(time / 3, 1);

      // Bewegung zur finalen Position (herausragender CPU-Bestandteil)
      const targetY = 0.4; // Finale Position: ragt aus CPU heraus
      const targetScale = 0.6; // Finale Größe als CPU-Bestandteil

      cubeRef.current.position.y = lerp(0, targetY, integrationProgress);
      cubeRef.current.position.x = Math.sin(time * 1.5) * 0.05; // Sehr leichte Bewegung
      cubeRef.current.rotation.x = time * 0.3; // Langsamere, kontinuierliche Rotation
      cubeRef.current.rotation.y = time * 0.2;
      cubeRef.current.rotation.z = time * 0.1;

      const scale = lerp(0.8, targetScale, integrationProgress);
      cubeRef.current.scale.setScalar(scale);

      // Material wird CPU-ähnlich
      if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
        // Übergang zu CPU-Farben
        const pulseIntensity = 0.3 + Math.sin(time * 2) * 0.2;
        cubeRef.current.material.emissiveIntensity = pulseIntensity;
        cubeRef.current.material.opacity = 1;

        // Farbe wird CPU-ähnlicher
        const cpuBlend = integrationProgress;
        cubeRef.current.material.color.setRGB(
          lerp(0, 0.2, cpuBlend), // Weniger Cyan, mehr grau
          lerp(0.83, 1, cpuBlend), // Behält etwas Grün
          lerp(1, 0.6, cpuBlend) // Weniger Blau
        );
      }
    } else if (sequence >= 2 && startAnimation) {
      // Sequenz 3+: Würfel ist dauerhaft integrierter CPU-Bestandteil
      cubeRef.current.position.y = 0.4; // Konstante Position: ragt aus CPU
      cubeRef.current.position.x = Math.sin(time * 1.5) * 0.03; // Minimale Bewegung
      cubeRef.current.position.z = 0; // Zentriert

      cubeRef.current.rotation.x = time * 0.2; // Langsame, kontinuierliche Rotation
      cubeRef.current.rotation.y = time * 0.15;
      cubeRef.current.rotation.z = time * 0.1;

      cubeRef.current.scale.setScalar(0.6); // Konstante CPU-Bestandteil-Größe

      // Material synchronisiert mit CPU
      if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
        // Pulst synchron mit der CPU
        const cpuPulse = 0.4 + Math.sin(time * 2) * 0.2;
        cubeRef.current.material.emissiveIntensity = cpuPulse;
        cubeRef.current.material.opacity = 1;

        // CPU-ähnliche Farbe (grün-bläulich)
        cubeRef.current.material.color.setRGB(0.1, 1, 0.6);
        cubeRef.current.material.emissive.setRGB(0.1, 1, 0.6);
      }
    }
  });

  // Würfel bleibt für immer als CPU-Bestandteil sichtbar
  // if (sequence >= 999) return null; // Niemals ausblenden

  return (
    <Box
      ref={cubeRef}
      position={[0, 8, 0]}
      args={[0.6, 0.6, 0.6]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#0066cc"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={1}
      />
    </Box>
  );
};

// 3D-CPU Komponente
interface CPU3DProps {
  sequence: number;
}

const CPU3D: React.FC<CPU3DProps> = ({ sequence }) => {
  const cpuRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!cpuRef.current || !coreRef.current) return;

    const time = clock.getElapsedTime();

    if (sequence >= 2) {
      // CPU aktiviert sich
      const intensity = 0.3 + Math.sin(time * 2) * 0.2;
      if (coreRef.current.material instanceof THREE.MeshStandardMaterial) {
        coreRef.current.material.emissiveIntensity = intensity;
      }

      // Leichte Rotation der CPU-Gruppe
      cpuRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={cpuRef} position={[0, -0.5, 0]}>
      {/* CPU Base */}
      <Box position={[0, 0, 0]} args={[3, 0.3, 3]} receiveShadow>
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.3} />
      </Box>

      {/* CPU Pins */}
      {Array.from({ length: 64 }).map((_, i) => {
        const x = ((i % 8) - 3.5) * 0.3;
        const z = (Math.floor(i / 8) - 3.5) * 0.3;
        return (
          <Box key={i} position={[x, 0.15, z]} args={[0.05, 0.3, 0.05]}>
            <meshStandardMaterial
              color="#ffd700"
              metalness={1}
              roughness={0.1}
            />
          </Box>
        );
      })}

      {/* CPU Core */}
      <Box
        ref={coreRef}
        position={[0, 0.2, 0]}
        args={[1.5, 0.2, 1.5]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={sequence >= 2 ? "#00ffaa" : "#34495e"}
          emissive={sequence >= 2 ? "#00ffaa" : "#2c3e50"}
          emissiveIntensity={sequence >= 2 ? 0.3 : 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* CPU Markierung */}
      <Box position={[0, 0.21, 0]} args={[0.3, 0.01, 0.3]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  );
};

// Aufbauende Quader (Sequenz 4)
interface BuildingBlocksProps {
  sequence: number;
}

const BuildingBlocks: React.FC<BuildingBlocksProps> = ({ sequence }) => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!groupRef.current || sequence < 3) return;

    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
  });

  if (sequence < 3) return null;

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 0.5;

        return (
          <group key={i}>
            <Box
              position={[x, y, z]}
              args={[0.4, 0.8, 0.4]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#4a90e2"
                emissive="#2c5aa0"
                emissiveIntensity={0.3}
                metalness={0.7}
                roughness={0.3}
              />
            </Box>
          </group>
        );
      })}
    </group>
  );
};

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  onComplete,
}) => {
  const [currentSequence, setCurrentSequence] = useState(0);

  // Sequenz-Schritte basierend auf den PNG-Beschreibungen
  const sequences = [
    {
      id: 1,
      title: "Würfel erscheint",
      description: "Ein kleiner Würfel fällt langsam in die CPU",
      duration: 4500, // Längere Duration für langsameren Fall
    },
    {
      id: 2,
      title: "Ein- und Austritt",
      description: "Der Würfel verschwindet und tritt wieder aus",
      duration: 3500, // Zeit für Zyklus-Animation
    },
    {
      id: 3,
      title: "Würfel eingefasst",
      description: "Integration in die CPU abgeschlossen",
      duration: 2000,
    },
    {
      id: 4,
      title: "Quader türmen sich auf",
      description: "Das Portfolio-System entsteht",
      duration: 3000,
    },
    {
      id: 5,
      title: "NextGen-Developer-Portfolio",
      description: "Bereit zum Erkunden",
      duration: 1500,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSequence < sequences.length - 1) {
        setCurrentSequence((current) => current + 1);
      } else {
        // Sequenz beendet - Portfolio laden
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, sequences[currentSequence]?.duration || 2000);

    return () => clearTimeout(timer);
  }, [currentSequence, sequences, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Hintergrund-Effekte */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-blue-900" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 3D-Canvas */}
      <div className="relative z-10 w-full h-full">
        <Canvas
          camera={{
            position: [0, 4, 8],
            fov: 45,
          }}
          shadows
        >
          {/* Beleuchtung */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight
            position={[0, 5, 0]}
            intensity={0.8}
            color="#00ffaa"
            distance={15}
            decay={2}
          />
          <spotLight
            position={[0, 8, 0]}
            angle={Math.PI / 4}
            penumbra={1}
            intensity={0.5}
            color="#00d4ff"
            castShadow
            target-position={[0, 0, 0]}
          />

          {/* 3D-Boden */}
          <Box position={[0, -1.2, 0]} args={[20, 0.2, 20]} receiveShadow>
            <meshStandardMaterial
              color="#1a1a2e"
              roughness={0.8}
              metalness={0.2}
            />
          </Box>

          {/* 3D-Komponenten */}
          <AnimatedCube sequence={currentSequence} />
          <CPU3D sequence={currentSequence} />
          <BuildingBlocks sequence={currentSequence} />

          {/* Development Controls (nur in Dev-Modus) */}
          {process.env.NODE_ENV === "development" && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Canvas>
      </div>

      {/* UI Overlay für Text und Fortschritt */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* Sequenz-Text */}
          <AnimatePresence mode="wait">
            {currentSequence < 4 ? (
              <motion.div
                key={currentSequence}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-wider">
                  {sequences[currentSequence]?.title}
                </h2>
                <p className="text-cyan-400 text-lg tracking-wide">
                  {sequences[currentSequence]?.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="portfolio-title"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center space-y-6"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-thin text-white tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  NEXTGEN
                </motion.h1>
                <motion.div
                  className="w-48 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: "12rem" }}
                  transition={{ delay: 1.5, duration: 1 }}
                />
                <motion.p
                  className="text-xl md:text-2xl text-cyan-400 font-light tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  Developer Portfolio
                </motion.p>
                <motion.p
                  className="text-gray-300 text-lg tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  Bereit zum Erkunden
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fortschrittsbalken */}
          <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-cyan-400 to-blue-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentSequence + 1) / sequences.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Sequenz-Nummer */}
          <div className="text-gray-400 text-sm tracking-wider">
            {currentSequence + 1} / {sequences.length}
          </div>
        </div>
      </div>

      {/* Partikel-Effekte */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: -20,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          />
        ))}
      </div>

      {/* Ambient Light Effect */}
      {currentSequence >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-cyan-500/5 pointer-events-none"
        />
      )}
    </motion.div>
  );
};
