"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder, Environment, Html } from "@react-three/drei";
import { Mesh, Group, Vector3 } from "three";
import * as THREE from "three";
import { useTheme } from "@/contexts/ThemeContext";

interface LoadingSequenceProps {
  onComplete: () => void;
}

// Kamera-Controller für dynamische Verfolgung
interface CameraControllerProps {
  sequence: number;
}

const FALL_DURATION = 6; // seconds
const START_HEIGHT = 8;
const END_HEIGHT = -0.3;

const CameraController: React.FC<CameraControllerProps> = ({ sequence }) => {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();

    if (sequence === 0) {
      // Kamera folgt dem Würfel während des Falls
      const fallProgress = Math.min(time / FALL_DURATION, 1);
      const targetY = START_HEIGHT - fallProgress * (START_HEIGHT - END_HEIGHT);

      // Sanfte Kamera-Bewegung
      camera.position.y += (targetY * 0.4 + 2 - camera.position.y) * 0.05;
      camera.lookAt(0, targetY * 0.6, 0);
    } else if (sequence === 1) {
      // Kamera zoomt näher ran zur CPU
      camera.position.y += (2 - camera.position.y) * 0.03;
      camera.position.z += (10 - camera.position.z) * 0.03;
      camera.lookAt(0, 0, 0);
    } else if (sequence >= 2) {
      // Kamera dreht sich leicht um die Szene
      const radius = 10;
      const angle = time * 0.1;
      camera.position.x = Math.sin(angle) * radius * 0.3;
      camera.position.z = Math.cos(angle) * radius;
      camera.position.y = 3;
      camera.lookAt(0, 0.5, 0);
    }
  });

  return null;
};

// 3D-Würfel Komponente
interface AnimatedCubeProps {
  sequence: number;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ sequence }) => {
  const cubeRef = useRef<Mesh>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [startTime, setStartTime] = useState(0);

  // Helper function für lineare Interpolation
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.position.set(0, START_HEIGHT, 0);
    }
    setStartAnimation(true);
  }, []);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!cubeRef.current) return;

    const currentTime = clock.getElapsedTime();

    // Setze Startzeit beim ersten Aufruf der Sequenz
    if (startAnimation && startTime === 0) {
      setStartTime(currentTime);
    }

    const time = currentTime - startTime;

    if (sequence === 0 && startAnimation) {
      // Sequenz 1: Würfel fällt langsam von oben in die CPU
      const fallProgress = Math.min(time / FALL_DURATION, 1);
      // EaseOutQuad für sanfteren Start
      const easeOutQuad = 1 - (1 - fallProgress) * (1 - fallProgress);

      // Würfel fällt von START_HEIGHT bis END_HEIGHT (sichtbar)
      cubeRef.current.position.y = START_HEIGHT - easeOutQuad * (START_HEIGHT - END_HEIGHT);
      cubeRef.current.position.x = Math.sin(time * 1.2) * 0.2;
      cubeRef.current.rotation.x = time * 1.2;
      cubeRef.current.rotation.y = time * 1.0;
      cubeRef.current.rotation.z = time * 0.8;

      const scale = 0.5 + fallProgress * 0.3;
      cubeRef.current.scale.setScalar(scale);
    } else if (sequence === 1 && startAnimation) {
      // Sequenz 2: Würfel erscheint wieder und ragt ZUR HÄLFTE aus CPU heraus
      const integrationProgress = Math.min(time / 2.5, 1);

      // Ziel: Würfel ragt zur Hälfte heraus (Y = 0.3, da CPU bei Y=0 ist)
      const targetY = 0.3; // Würfel-Größe ist 0.8, also ragt 0.4 (die Hälfte) heraus
      const targetScale = 0.8;

      // Würfel taucht aus der CPU auf
      cubeRef.current.position.y = lerp(-0.3, targetY, integrationProgress);
      cubeRef.current.position.x = Math.sin(time * 1.5) * 0.05;
      cubeRef.current.rotation.x = time * 0.3;
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
      cubeRef.current.position.y = 0.3; // Konstante Position: ragt zur Hälfte aus CPU
      cubeRef.current.position.x = Math.sin(currentTime * 1.5) * 0.03;
      cubeRef.current.position.z = 0;

      cubeRef.current.rotation.x = currentTime * 0.2;
      cubeRef.current.rotation.y = currentTime * 0.15;
      cubeRef.current.rotation.z = currentTime * 0.1;

      cubeRef.current.scale.setScalar(0.8); // Würfel-Größe bleibt bei 0.8

      // Material synchronisiert mit CPU
      if (cubeRef.current.material instanceof THREE.MeshStandardMaterial) {
        const cpuPulse = 0.5 + Math.sin(currentTime * 2) * 0.3;
        cubeRef.current.material.emissiveIntensity = cpuPulse;
        cubeRef.current.material.opacity = 1;

        // Leuchtende CPU-Farbe (cyan-grün)
        cubeRef.current.material.color.setRGB(0.0, 0.9, 0.7);
        cubeRef.current.material.emissive.setRGB(0.0, 0.9, 0.7);
      }
    }
  });

  // Würfel ist nur sichtbar wenn Sequenz >= 0
  if (sequence < 0) return null;

  return (
    <Box
      ref={cubeRef}
      position={[0, 6, 0]}
      args={[0.8, 0.8, 0.8]}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color="#00d4ff"
        emissive="#0099ff"
        emissiveIntensity={0.4}
        metalness={0.95}
        roughness={0.05}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={1}
        transmission={0.2}
        thickness={0.5}
        ior={2.4}
        envMapIntensity={1.5}
      />
    </Box>
  );
};

// Hintergrund mit Porträt und Titel
const PortraitBackdrop: React.FC = () => {
  const texture = useLoader(THREE.TextureLoader, "/Image/BW-Foto.jpg");
  return (
    <group>
      <mesh position={[0, 4, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[5.1, 6]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Html position={[0, 8, -8]} center distanceFactor={8} transform>
        <div className="px-4 py-2 rounded-full bg-black/70 text-white text-sm font-semibold shadow-lg backdrop-blur">
          Web- & Softwareentwickler
        </div>
      </Html>

      <Html position={[0, 0.2, -8]} center distanceFactor={10} transform>
        <div className="px-4 py-2 rounded-full bg-black/70 text-white text-sm font-semibold shadow-lg backdrop-blur">
          Steffen Lorenz
        </div>
      </Html>
    </group>
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
      {/* CPU Base - Realistische PCB */}
      <Box position={[0, 0, 0]} args={[3, 0.3, 3]} receiveShadow castShadow>
        <meshPhysicalMaterial
          color="#1a3d2e"
          metalness={0.2}
          roughness={0.6}
          clearcoat={0.3}
          clearcoatRoughness={0.4}
        />
      </Box>

      {/* CPU Pins - Goldene Kontakte */}
      {Array.from({ length: 100 }).map((_, i) => {
        const x = ((i % 10) - 4.5) * 0.25;
        const z = (Math.floor(i / 10) - 4.5) * 0.25;
        return (
          <Box
            key={i}
            position={[x, 0.15, z]}
            args={[0.06, 0.3, 0.06]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#ffcc00"
              metalness={1}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.05}
              reflectivity={1}
            />
          </Box>
        );
      })}

      {/* CPU Core - Silicon Chip */}
      <Box
        ref={coreRef}
        position={[0, 0.25, 0]}
        args={[1.8, 0.15, 1.8]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={sequence >= 2 ? "#00ffaa" : "#2d3e50"}
          emissive={sequence >= 2 ? "#00ffaa" : "#1a2530"}
          emissiveIntensity={sequence >= 2 ? 0.6 : 0.1}
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
        />
      </Box>

      {/* CPU Heatspreader - Metallische Oberfläche */}
      <Box position={[0, 0.33, 0]} args={[1.6, 0.02, 1.6]} castShadow>
        <meshPhysicalMaterial
          color="#e0e0e0"
          metalness={1}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </Box>

      {/* CPU Logo/Markierung */}
      <Box position={[0, 0.35, 0]} args={[0.4, 0.005, 0.4]}>
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Realistische Kondensatoren um die CPU */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={`cap-${i}`}>
            <mesh position={[x, 0.2, z]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
              <meshPhysicalMaterial
                color="#1a1a1a"
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
            <mesh position={[x, 0.35, z]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
              <meshPhysicalMaterial
                color="#b8860b"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Leuchtende Leiterbahnen von CPU zu den Stationen
interface CircuitTracesProps {
  sequence: number;
}

const CircuitTraces: React.FC<CircuitTracesProps> = ({ sequence }) => {
  const tracesRef = useRef<Group>(null);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!tracesRef.current || sequence < 2) return;

    const time = clock.getElapsedTime();

    // Pulsierendes Leuchten durch die Leiterbahnen
    tracesRef.current.children.forEach((child, i) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        const wave = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.7;
        child.material.emissiveIntensity = wave;
      }
    });
  });

  if (sequence < 2) return null;

  // 12 Stationen-Positionen (wie BuildingBlocks)
  const stationPositions = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 2;
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      angle: angle,
    };
  });

  return (
    <group ref={tracesRef}>
      {stationPositions.map((pos, i) => {
        const colors = [
          "#00d4ff",
          "#00ffaa",
          "#ff00aa",
          "#ffaa00",
          "#aa00ff",
          "#00ff00",
        ];
        const color = colors[i % colors.length];

        // Erstelle Leiterbahn von CPU (0,0,0) zur Station
        const segments = 20;
        const points: THREE.Vector3[] = [];

        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          // Kurvige Leiterbahn (Bezier-ähnlich)
          const x = pos.x * t;
          const z = pos.z * t;
          const y = -0.5 + Math.sin(t * Math.PI) * 0.3; // Wellenförmig
          points.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 32, 0.02, 8, false);

        return (
          <group key={`trace-${i}`}>
            {/* Leiterbahn */}
            <mesh geometry={tubeGeometry}>
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>

            {/* Leuchtende Punkte entlang der Leiterbahn */}
            {Array.from({ length: 5 }).map((_, pointIndex) => {
              const t = (pointIndex + 1) / 6;
              const point = curve.getPoint(t);
              return (
                <mesh
                  key={`point-${i}-${pointIndex}`}
                  position={[point.x, point.y, point.z]}
                >
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.2}
                  />
                </mesh>
              );
            })}

            {/* Verbindungs-Pad an der CPU */}
            <mesh
              position={[0, -0.5, 0]}
              rotation={[-Math.PI / 2, 0, pos.angle]}
            >
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                metalness={1}
                roughness={0.1}
              />
            </mesh>

            {/* Verbindungs-Pad an der Station */}
            <mesh
              position={[pos.x, -0.5, pos.z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                metalness={1}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}
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

        const colors = [
          "#4a90e2",
          "#e74c3c",
          "#2ecc71",
          "#f39c12",
          "#9b59b6",
          "#1abc9c",
        ];
        const color = colors[i % colors.length];
        return (
          <group key={i}>
            <Box
              position={[x, y, z]}
              args={[0.45, 0.9, 0.45]}
              castShadow
              receiveShadow
            >
              <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                metalness={0.85}
                roughness={0.15}
                clearcoat={1}
                clearcoatRoughness={0.1}
                reflectivity={1}
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
  const { theme } = useTheme();
  const [currentSequence, setCurrentSequence] = useState(0);

  // Sequenz-Schritte basierend auf den PNG-Beschreibungen
  const sequences = [
    {
      id: 1,
      title: "",
      description: "",
      duration: 6500, // Längerer Fall (6s) sichtbar
    },
    {
      id: 2,
      title: "",
      description: "",
      duration: 3000, // Zeit für Zyklus-Animation
    },
    {
      id: 3,
      title: "",
      description: "",
      duration: 2500,
    },
    {
      id: 4,
      title: "",
      description: "",
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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #0b1220 0%, #0f172a 35%, #0a0f1c 100%)"
            : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 35%, #e5e7eb 100%)",
      }}
    >
      {/* Hintergrund-Effekte - FOTOREALISTISCH */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(to top, rgba(6,12,24,0.8), rgba(8,18,36,0.6), rgba(10,20,40,0.4))"
              : "linear-gradient(to top, rgba(226,232,240,0.6), rgba(203,213,225,0.4), rgba(229,231,235,0.3))",
        }}
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-6">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(94,234,212,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(94,234,212,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 3D-Canvas */}
      <div className="relative z-10 w-full h-full">
        <Canvas
          camera={{
            position: [0, 3, 12],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          shadows="soft"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          {/* FOTOREALISTISCHE STUDIO-BELEUCHTUNG */}

          {/* Ambient/Environment Light */}
          <ambientLight intensity={0.5} color="#cdd6ff" />

          {/* Key Light - Hauptlicht (vorne rechts oben) */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={2.2}
            color="#ffffff"
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
            shadow-bias={-0.0001}
          />

          {/* Fill Light - Fülllicht (links) */}
          <directionalLight
            position={[-6, 8, 4]}
            intensity={1.0}
            color="#a5b8ff"
          />

          {/* Back Light - Gegenlicht (hinten oben) */}
          <directionalLight
            position={[-3, 10, -8]}
            intensity={1.4}
            color="#d0c8a0"
          />

          {/* Top Light - Oberlicht */}
          <pointLight
            position={[0, 15, 0]}
            intensity={1.2}
            color="#cfd9ff"
            distance={25}
            decay={2}
            castShadow
          />

          {/* Accent Lights - Akzentbeleuchtung für CPU */}
          <spotLight
            position={[4, 6, 4]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={2.5}
            color="#00d4ff"
            castShadow
            target-position={[0, 0, 0]}
          />

          <spotLight
            position={[-4, 6, -4]}
            angle={Math.PI / 6}
            penumbra={0.5}
            intensity={2}
            color="#00ffaa"
            target-position={[0, 0, 0]}
          />

          {/* Rim Lights - Randbeleuchtung */}
          <pointLight
            position={[6, 3, -6]}
            intensity={1.8}
            color="#4da6ff"
            distance={20}
            decay={2}
          />
          <pointLight
            position={[-6, 3, 6]}
            intensity={1.5}
            color="#66ffcc"
            distance={20}
            decay={2}
          />

          {/* Ground Bounce Light - Bodenreflexion */}
          <hemisphereLight
            args={["#ffffff", "#1a1a2e", 1]}
            position={[0, -1, 0]}
          />

          {/* Environment Map für realistische Reflexionen */}
          <Environment preset="city" background={false} />

          {/* Realistischer Motherboard-Boden */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.2, 0]}
            receiveShadow
          >
            <planeGeometry args={[30, 30]} />
            <meshPhysicalMaterial
              color="#0d1f1a"
              roughness={0.3}
              metalness={0.6}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
              reflectivity={0.8}
              envMapIntensity={1}
            />
          </mesh>

          {/* Leuchtende Motherboard-Grid-Linien */}
          <gridHelper
            args={[30, 60, "#00d4ff", "#004455"]}
            position={[0, -1.15, 0]}
          />

          {/* Zusätzliche leuchtende Linien für Motherboard-Look */}
          <group position={[0, -1.14, 0]}>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 3;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const rotation = angle + Math.PI / 2;

              return (
                <mesh
                  key={`line-${i}`}
                  position={[x / 2, 0, z / 2]}
                  rotation={[-Math.PI / 2, 0, rotation]}
                >
                  <planeGeometry args={[0.05, radius]} />
                  <meshStandardMaterial
                    color="#00ffaa"
                    emissive="#00ffaa"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              );
            })}

            {/* Konzentrische Kreise um CPU */}
            {Array.from({ length: 3 }).map((_, i) => {
              const radius = (i + 1) * 1.5;
              const points: THREE.Vector3[] = [];

              for (let j = 0; j <= 64; j++) {
                const angle = (j / 64) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                points.push(new THREE.Vector3(x, 0, z));
              }

              const curve = new THREE.CatmullRomCurve3(points, true);
              const tubeGeometry = new THREE.TubeGeometry(
                curve,
                64,
                0.02,
                8,
                true
              );

              return (
                <mesh key={`circle-${i}`} geometry={tubeGeometry}>
                  <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.5 + i * 0.2}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              );
            })}
          </group>

          {/* Kamera-Controller */}
          <CameraController sequence={currentSequence} />

          {/* 3D-Komponenten */}
          <PortraitBackdrop />
          <AnimatedCube sequence={currentSequence} />
          <CPU3D sequence={currentSequence} />

          {/* Leuchtende Leiterbahnen von CPU zu Stationen */}
          <CircuitTraces sequence={currentSequence} />

          <BuildingBlocks sequence={currentSequence} />

          {/* OrbitControls auch in Production, damit Nutzer die Szene wie lokal bewegen können */}
          <OrbitControls
            enablePan={true} 
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
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
                <h2
                  className="text-2xl md:text-3xl font-light tracking-wider"
                  style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
                >
                  {sequences[currentSequence]?.title}
                </h2>
                <p
                  className="text-lg tracking-wide"
                  style={{ color: theme === "dark" ? "#06b6d4" : "#0891b2" }}
                >
                  {sequences[currentSequence]?.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="portfolio-title"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-center space-y-6"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-thin tracking-wider"
                  style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  NEXTGEN
                </motion.h1>
                <motion.div
                  className="w-48 pt-52 h-1 mx-auto"
                  style={{
                    background:
                      theme === "dark"
                        ? "linear-gradient(to right, transparent, #06b6d4, transparent)"
                        : "linear-gradient(to right, transparent, #0891b2, transparent)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: "12rem" }}
                  transition={{ delay: 1.0, duration: 1.5 }}
                />
                <motion.p
                  className="text-xl md:text-2xl font-light tracking-wide"
                  style={{ color: theme === "dark" ? "#06b6d4" : "#0891b2" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  Developer Portfolio
                </motion.p>
                <motion.p
                  className="text-lg tracking-wide"
                  style={{ color: theme === "dark" ? "#cbd5e1" : "#475569" }}
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
            {/*<div
              className="w-80 h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#cbd5e1",
              }}
            >
              <motion.div
                className="h-full"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(to right, #06b6d4, #3b82f6)"
                      : "linear-gradient(to right, #0891b2, #2563eb)",
                }}
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentSequence + 1) / sequences.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>*/}

          {/* Sequenz-Nummer */}
          {/*<div
            className="text-sm tracking-wider"
            style={{ color: theme === "dark" ? "#94a3b8" : "#64748b" }}
          >
            {currentSequence + 1} / {sequences.length}
          </div>*/}
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
