"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Box,
  RoundedBox,
  Sphere,
  Cone,
  Cylinder,
  Torus,
  Text,
  Html,
} from "@react-three/drei";
import { Group } from "three";
import { useStationManager } from "@/contexts/StationManager";

interface PortfolioStationsProps {
  position?: [number, number, number];
}

/**
 * PROFESSIONELLES TECH-PORTFOLIO - CLEAN & MINIMAL
 * Saubere Stationen für Tech-Unternehmen
 */
export default function PortfolioStations({
  position = [0, 0, 0],
}: PortfolioStationsProps) {
  const groupRef = useRef<Group>(null);
  const { activeStation, activateStation } = useStationManager();

  // PROFESSIONELLE STATION-POSITIONEN - AUF 2M GITTER-RASTER
  const stations = [
    {
      name: "BACKSTAGE",
      pos: [0, 1, 18], // Alte WORKS Position (Server-Farm Position)
      type: "backstage",
      color: "#333333",
    },
    { name: "WORKS", pos: [-16, 1, 12], type: "works", color: "#004499" }, // Von -20 → -16 (4m zum Portal hin)
    { name: "CONTACT", pos: [-20, 1, -2], type: "contact", color: "#006633" }, // Von (-20, -10) → (-20, -2) - nochmals 8m näher
    { name: "RESUME", pos: [-9.5, 1, -12], type: "resume", color: "#666666" }, // 3m vor
    {
      name: "EXPERIENCE",
      pos: [14, 1, 4], // Zwischen CPU und Skills Station
      type: "experience",
      color: "#990066",
    },
    {
      name: "TESTIMONIALS",
      pos: [17, 1, 18],
      type: "testimonials",
      color: "#ff9900",
    }, // Näher zum CPU
    { name: "ABOUT ME", pos: [2, 1, -15], type: "about", color: "#00aaff" }, // Noch weiter links und zurück
    { name: "SKILLS", pos: [14, 1, -8], type: "skills", color: "#cc0000" }, // Noch näher zum CPU: von [16, 1, -12] zu [14, 1, -8]
  ];

  // KEINE ROTATION MEHR - ALLES BLEIBT STATISCH

  // PROFESSIONELLE STATIONEN - EINHEITLICHES DESIGN
  const Station = ({
    type,
    pos,
    name,
    color,
  }: {
    type: string;
    pos: [number, number, number];
    name: string;
    color: string;
  }) => {
    const stationRef = useRef<Group>(null);

    // Spezielle Backstage Station mit CyberTor
    if (type === "backstage") {
      return (
        <group position={pos} ref={stationRef}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 7, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-cyan-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-cyan-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-cyan-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* CYBER TOR MIT ANIMIERTEN TÜREN - 180° GEDREHT */}
          <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
            {/* Tor-Rahmen */}
            <group>
              {/* Linker Pfosten */}
              <Box args={[0.4, 5, 0.4]} position={[-2.2, 2.5, 0]}>
                <meshStandardMaterial
                  color="#3a3a4e"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Box>
              {/* Rechter Pfosten */}
              <Box args={[0.4, 5, 0.4]} position={[2.2, 2.5, 0]}>
                <meshStandardMaterial
                  color="#1a1a2e"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Box>
              {/* Oberer Balken */}
              <Box args={[4.8, 0.4, 0.4]} position={[0, 5.2, 0]}>
                <meshStandardMaterial
                  color="#1a1a2e"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Box>

              {/* Cyber-Lichter am Rahmen */}
              {Array.from({ length: 8 }).map((_, i) => {
                const y = 1 + i * 0.5;
                return (
                  <group key={i}>
                    <Sphere args={[0.05]} position={[-2.4, y, 0.1]}>
                      <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={0.8}
                      />
                    </Sphere>
                    <Sphere args={[0.05]} position={[2.4, y, 0.1]}>
                      <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={0.8}
                      />
                    </Sphere>
                  </group>
                );
              })}
            </group>

            {/* MONITOR-TÜRENPORTALE */}
            <group>
              {/* Linkes Monitor-Portal (Tür) */}
              <group position={[-1, 2.4, 0]}>
                {/* Monitor-Rahmen als Tür */}
                <Box args={[2.1, 4.9, 0.15]} position={[0, 0, 0]}>
                  <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                  />
                </Box>

                {/* Großer Monitor-Bildschirm */}
                <Box args={[1.8, 4.5, 0.08]} position={[0, 0, 0.12]}>
                  <meshStandardMaterial
                    color="#001133"
                    emissive="#002266"
                    emissiveIntensity={0.9}
                    metalness={0.8}
                    roughness={0.1}
                  />
                </Box>

                {/* Portal-Effekt - leuchtende Ringe */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const size = 0.3 + i * 0.2;
                  return (
                    <Box
                      key={i}
                      args={[size, 0.05, 0.1]}
                      position={[0, 0.5 - i * 0.5, 0.15]}
                    >
                      <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={0.8 - i * 0.1}
                      />
                    </Box>
                  );
                })}

                {/* Vertikale Datenlinien */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const x = -0.7 + i * 0.2;
                  return (
                    <Box key={i} args={[0.02, 4, 0.1]} position={[x, 0, 0.15]}>
                      <meshStandardMaterial
                        color="#0088ff"
                        emissive="#0044aa"
                        emissiveIntensity={0.4}
                      />
                    </Box>
                  );
                })}
              </group>

              {/* Rechtes Monitor-Portal (Tür) */}
              <group position={[1, 2.4, 0]}>
                {/* Monitor-Rahmen als Tür */}
                <Box args={[2.1, 4.9, 0.15]} position={[0, 0, 0]}>
                  <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                  />
                </Box>

                {/* Großer Monitor-Bildschirm */}
                <Box args={[1.8, 4.5, 0.08]} position={[0, 0, 0.12]}>
                  <meshStandardMaterial
                    color="#110033"
                    emissive="#220066"
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.1}
                  />
                </Box>

                {/* Portal-Effekt - leuchtende Hexagone */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const y = -1.5 + i * 1;
                  return (
                    <Box key={i} args={[0.6, 0.4, 0.1]} position={[0, y, 0.15]}>
                      <meshStandardMaterial
                        color="#ff0088"
                        emissive="#ff0088"
                        emissiveIntensity={0.7}
                      />
                    </Box>
                  );
                })}

                {/* Horizontale Energielinien */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const y = -2 + i * 0.35;
                  return (
                    <Box
                      key={i}
                      args={[1.6, 0.02, 0.1]}
                      position={[0, y, 0.15]}
                    >
                      <meshStandardMaterial
                        color="#8800ff"
                        emissive="#4400aa"
                        emissiveIntensity={0.5}
                      />
                    </Box>
                  );
                })}
              </group>
            </group>

            {/* Basis-Platform */}
            <Box args={[5.5, 0.2, 1]} position={[0, 0.1, 0]}>
              <meshStandardMaterial
                color="#4c4c74"
                metalness={0.6}
                roughness={0.4}
              />
            </Box>
          </group>
        </group>
      );
    }

    // Spezielle Experience Station mit Stehschreibtisch
    if (type === "experience") {
      return (
        <group position={pos} ref={stationRef} rotation={[0, -Math.PI / 3, 0]}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 5, -3.5]} center distanceFactor={10}>
            <div
              className="bg-black/90 backdrop-blur-md border border-purple-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-purple-400/20 transition-all duration-300 hover:scale-105"
              onClick={() => activateStation(type as any)}
            >
              <h3 className="text-purple-400 font-bold text-4xl whitespace-nowrap">
                {name}
              </h3>
            </div>
          </Html>
          )}

          {/* GROSSER HÖHENVERSTELLBARER STEHSCHREIBTISCH */}
          <group position={[0, 0, -3.5]}>
            {/* Schräge Tischplatte */}
            <RoundedBox
              args={[4, 0.15, 2]}
              position={[0, 2.2, 0]}
              rotation={[-0.15, 0, 0]}
            >
              <meshStandardMaterial
                color="#2c3e50"
                metalness={0.4}
                roughness={0.6}
              />
            </RoundedBox>

            {/* Höhenverstellbare Tischbeine mit Teleskopfunktion */}
            {/* Vordere Beine (niedriger) */}
            <group>
              {/* Unterer Teil */}
              <Box args={[0.15, 1.5, 0.15]} position={[1.8, 0.75, 0.8]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Box>
              {/* Oberer verstellbarer Teil */}
              <Box args={[0.12, 0.6, 0.12]} position={[1.8, 1.8, 0.8]}>
                <meshStandardMaterial
                  color="#5d6d7e"
                  metalness={0.4}
                  roughness={0.6}
                />
              </Box>
              {/* Verstellmechanismus */}
              <Cylinder args={[0.08, 0.08, 0.3, 8]} position={[1.8, 1.5, 0.8]}>
                <meshStandardMaterial
                  color="#85929e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Cylinder>
            </group>

            <group>
              <Box args={[0.15, 1.5, 0.15]} position={[-1.8, 0.75, 0.8]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Box>
              <Box args={[0.12, 0.6, 0.12]} position={[-1.8, 1.8, 0.8]}>
                <meshStandardMaterial
                  color="#5d6d7e"
                  metalness={0.4}
                  roughness={0.6}
                />
              </Box>
              <Cylinder args={[0.08, 0.08, 0.3, 8]} position={[-1.8, 1.5, 0.8]}>
                <meshStandardMaterial
                  color="#85929e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Cylinder>
            </group>

            {/* Hintere Beine (höher für Schräge) */}
            <group>
              <Box args={[0.15, 1.8, 0.15]} position={[1.8, 0.9, -0.8]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Box>
              <Box args={[0.12, 0.8, 0.12]} position={[1.8, 2.2, -0.8]}>
                <meshStandardMaterial
                  color="#5d6d7e"
                  metalness={0.4}
                  roughness={0.6}
                />
              </Box>
              <Cylinder args={[0.08, 0.08, 0.4, 8]} position={[1.8, 1.8, -0.8]}>
                <meshStandardMaterial
                  color="#85929e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Cylinder>
            </group>

            <group>
              <Box args={[0.15, 1.8, 0.15]} position={[-1.8, 0.9, -0.8]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Box>
              <Box args={[0.12, 0.8, 0.12]} position={[-1.8, 2.2, -0.8]}>
                <meshStandardMaterial
                  color="#5d6d7e"
                  metalness={0.4}
                  roughness={0.6}
                />
              </Box>
              <Cylinder
                args={[0.08, 0.08, 0.4, 8]}
                position={[-1.8, 1.8, -0.8]}
              >
                <meshStandardMaterial
                  color="#85929e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Cylinder>
            </group>

            {/* INTEGRIERTER MONITOR IN DER SCHRÄGEN TISCHPLATTE */}
            <group position={[0, 2.28, 0]} rotation={[-0.25, 0, 0]}>
              {/* Monitor-Bildschirm (in schräge Tischplatte eingelassen) */}
              <Box args={[3.2, 0.05, 1.6]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#000066"
                  emissive="#002244"
                  emissiveIntensity={0.4}
                  metalness={0.9}
                  roughness={0.1}
                />
              </Box>

              {/* Bildschirm-Rahmen */}
              <Box args={[3.4, 0.02, 1.8]} position={[0, -0.02, 0]}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.2}
                  roughness={0.8}
                />
              </Box>

              {/* Displayinhalt-Simulation */}
              <Box args={[3, 0.06, 0.3]} position={[0, 0.01, -0.5]}>
                <meshStandardMaterial
                  color="#00ff00"
                  emissive="#00aa00"
                  emissiveIntensity={0.3}
                />
              </Box>
              <Box args={[2.8, 0.06, 0.2]} position={[0, 0.01, -0.2]}>
                <meshStandardMaterial
                  color="#0088ff"
                  emissive="#004488"
                  emissiveIntensity={0.3}
                />
              </Box>
              <Box args={[2.6, 0.06, 0.2]} position={[0, 0.01, 0.1]}>
                <meshStandardMaterial
                  color="#ff8800"
                  emissive="#cc4400"
                  emissiveIntensity={0.3}
                />
              </Box>
            </group>

            {/* Tastatur auf der schrägen Oberfläche */}
            <Box
              args={[1.4, 0.08, 0.5]}
              position={[0.8, 2.32, 0.4]}
              rotation={[-0.15, 0, 0]}
            >
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.2}
                roughness={0.8}
              />
            </Box>

            {/* Maus */}
            <RoundedBox
              args={[0.08, 0.04, 0.12]}
              position={[1.6, 2.32, 0.4]}
              rotation={[-0.15, 0, 0]}
            >
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.2}
                roughness={0.8}
              />
            </RoundedBox>

            {/* Höhenverstellung-Bedienfeld */}
            <group position={[1.5, 1.2, 0]}>
              <Box args={[0.3, 0.6, 0.1]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#2c3e50"
                  metalness={0.5}
                  roughness={0.5}
                />
              </Box>
              {/* Auf/Ab Buttons */}
              <Box args={[0.08, 0.08, 0.02]} position={[0, 0.15, 0.06]}>
                <meshStandardMaterial
                  color="#27ae60"
                  emissive="#1e8449"
                  emissiveIntensity={0.2}
                />
              </Box>
              <Box args={[0.08, 0.08, 0.02]} position={[0, -0.15, 0.06]}>
                <meshStandardMaterial
                  color="#e74c3c"
                  emissive="#c0392b"
                  emissiveIntensity={0.2}
                />
              </Box>
            </group>
          </group>
        </group>
      );
    }

    // Spezielle Contact Station mit Satellitenschüssel
    if (type === "contact") {
      const satelliteRef = useRef<Group>(null);

      // Animation für Satellitenschüssel - Empfang suchen
      useFrame(({ clock }) => {
        if (satelliteRef.current) {
          const time = clock.getElapsedTime();
          // Langsame Schwenkbewegung horizontal
          satelliteRef.current.rotation.y = Math.sin(time * 0.3) * 0.4; // ±23°
          // Leichte vertikale Neigung
          satelliteRef.current.rotation.x = 0.1 + Math.sin(time * 0.2) * 0.15; // 6° bis 24°
        }
      });

      return (
        <group position={pos} ref={stationRef}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 8, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-green-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-green-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-green-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* STATISCHER SOCKEL UND MECHANIK */}
          {/* Robuste ovale Basis - BLEIBT STATISCH */}
          <group position={[0, 1.5, 0]}>
            <Cylinder
              args={[1.4, 1.6, 2.2, 32]}
              position={[0, 0, 0]}
              scale={[1, 1, 0.7]}
            >
              <meshStandardMaterial
                color="#485868"
                metalness={0.6}
                roughness={0.4}
              />
            </Cylinder>
            <Cylinder
              args={[1.7, 1.9, 0.4, 32]}
              position={[0, -0.9, 0]}
              scale={[1, 1, 0.7]}
            >
              <meshStandardMaterial
                color="#586878"
                metalness={0.5}
                roughness={0.5}
              />
            </Cylinder>

            {/* Vertiefungen im Sockel */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = Math.cos(angle) * 1.2;
              const z = Math.sin(angle) * 1.2;
              return (
                <Box
                  key={`indent-${i}`}
                  args={[0.3, 0.8, 0.1]}
                  position={[x, 0, z * 0.7]}
                  rotation={[0, angle, 0]}
                >
                  <meshStandardMaterial
                    color="#3a4a5a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </Box>
              );
            })}

            {/* Wartungsklappen */}
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
              const x = Math.cos(angle) * 1.5;
              const z = Math.sin(angle) * 1.5;
              return (
                <group key={`panel-${i}`}>
                  {/* Klappe */}
                  <Box
                    args={[0.4, 1.2, 0.05]}
                    position={[x, 0.3, z * 0.7]}
                    rotation={[0, angle, 0]}
                  >
                    <meshStandardMaterial
                      color="#6a7a8a"
                      metalness={0.8}
                      roughness={0.2}
                    />
                  </Box>

                  {/* Klappengriff */}
                  <Box
                    args={[0.08, 0.15, 0.08]}
                    position={[x * 1.1, 0.3, z * 0.77]}
                    rotation={[0, angle, 0]}
                  >
                    <meshStandardMaterial
                      color="#2a3a4a"
                      metalness={0.9}
                      roughness={0.1}
                    />
                  </Box>
                </group>
              );
            })}

            {/* Verstärkungsrippen */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const x = Math.cos(angle) * 1.45;
              const z = Math.sin(angle) * 1.45;
              return (
                <Box
                  key={`rib-${i}`}
                  args={[0.08, 1.8, 0.08]}
                  position={[x, 0, z * 0.7]}
                  rotation={[0, angle, 0]}
                >
                  <meshStandardMaterial
                    color="#5a6a7a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </Box>
              );
            })}
          </group>

          {/* PIVOT-MECHANISMUS - STATISCH */}
          <group position={[0, 2.8, 0]}>
            {/* Vertikaler Mast */}
            <Cylinder args={[0.25, 0.25, 1.5, 16]}>
              <meshStandardMaterial
                color="#586878"
                metalness={0.8}
                roughness={0.2}
              />
            </Cylinder>

            {/* Azimut-Lager (horizontal rotation) */}
            <Cylinder position={[0, 0.8, 0]} args={[0.4, 0.4, 0.3, 16]}>
              <meshStandardMaterial
                color="#444"
                metalness={0.9}
                roughness={0.1}
              />
            </Cylinder>

            {/* Elevation-Arm */}
            <Box position={[0, 1, 0.4]} args={[0.8, 0.15, 0.8]}>
              <meshStandardMaterial
                color="#666"
                metalness={0.7}
                roughness={0.3}
              />
            </Box>

            {/* Elevation-Pivot */}
            <Cylinder
              position={[0, 1, 0.8]}
              args={[0.2, 0.2, 0.6, 12]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <meshStandardMaterial
                color="#586878"
                metalness={0.8}
                roughness={0.2}
              />
            </Cylinder>
          </group>

          {/* VERBINDUNGSKABEL UND ROHRE */}
          {Array.from({ length: 3 }).map((_, i) => {
            const angle = (i / 3) * Math.PI * 2;
            const x = Math.cos(angle) * 0.3;
            const z = Math.sin(angle) * 0.3;
            return (
              <group key={`cable-${i}`}>
                {/* Kabel vom Sockel zur Schüssel */}
                <Cylinder
                  position={[x, 3.5, z]}
                  args={[0.03, 0.03, 2, 8]}
                  rotation={[0.2, angle, 0]}
                >
                  <meshStandardMaterial color="#222" />
                </Cylinder>

                {/* Kabelschutz */}
                <Box
                  position={[x * 0.5, 2.5, z * 0.5]}
                  args={[0.08, 0.08, 0.3]}
                >
                  <meshStandardMaterial color="#333" />
                </Box>
              </group>
            );
          })}

          {/* SCHWENKBARE SATELLITENSCHÜSSEL - NUR DIESE BEWEGT SICH */}
          <group ref={satelliteRef} position={[0, 4, 0]} rotation={[0.1, 0, 0]}>
            {/* Rundes Vieleck als Schüssel - nach innen gewölbt */}
            <Sphere
              args={[3, 16, 16]}
              position={[0, 0.75, 0]}
              scale={[1, 0.3, 1]}
            >
              <meshStandardMaterial
                color="#2a3a4a"
                metalness={0.9}
                roughness={0.1}
                side={1}
              />
            </Sphere>

            {/* LNB */}
            <Cylinder args={[0.15, 0.15, 1.2, 12]} position={[0, 1.35, 0]}>
              <meshStandardMaterial color="#333" />
            </Cylinder>
          </group>
        </group>
      );
    }

    // Spezielle Works Station mit 3x3 Server
    if (type === "works") {
      return (
        <group
          position={pos}
          ref={stationRef}
          rotation={[0, Math.PI / 4 + Math.PI / 8, 0]}
        >
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 7, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-blue-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-blue-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-blue-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* 3x3 Server-Rack Grid */}
          {Array.from({ length: 9 }).map((_, i) => {
            const x = ((i % 3) - 1) * 2.2;
            const z = (Math.floor(i / 3) - 1) * 1.8;
            return (
              <group key={`server-rack-${i}`} position={[x, 0, z]}>
                {/* Server-Rack Schrank */}
                <RoundedBox args={[1.8, 4, 1.2]} position={[0, 2, 0]}>
                  <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </RoundedBox>

                {/* Server-Einschübe mit LED-Lichtern */}
                {Array.from({ length: 10 }).map((_, j) => {
                  const yPos = 3.6 - j * 0.35;
                  return (
                    <group key={`server-${i}-${j}`}>
                      {/* Server-Einheit */}
                      <Box args={[1.65, 0.28, 1]} position={[0, yPos, 0.05]}>
                        <meshStandardMaterial
                          color="#2c2c3e"
                          metalness={0.6}
                          roughness={0.4}
                        />
                      </Box>
                      {/* Status-LEDs */}
                      {Array.from({ length: 3 }).map((_, k) => (
                        <Sphere
                          key={`led-${k}`}
                          args={[0.025]}
                          position={[-0.65 + k * 0.12, yPos, 0.65]}
                        >
                          <meshStandardMaterial
                            color={
                              k === 0
                                ? "#00ff00"
                                : k === 1
                                ? "#0088ff"
                                : "#ff8800"
                            }
                            emissive={
                              k === 0
                                ? "#00ff00"
                                : k === 1
                                ? "#0088ff"
                                : "#ff8800"
                            }
                            emissiveIntensity={0.8}
                          />
                        </Sphere>
                      ))}
                    </group>
                  );
                })}

                {/* Lüftungsgitter oben */}
                {Array.from({ length: 6 }).map((_, v) => (
                  <Box
                    key={`vent-${v}`}
                    args={[0.2, 0.05, 1]}
                    position={[-0.65 + v * 0.26, 3.95, 0.05]}
                  >
                    <meshStandardMaterial
                      color="#0a0a1a"
                      metalness={0.5}
                      roughness={0.5}
                    />
                  </Box>
                ))}

                {/* Kabelmanagement an der Seite */}
                {Array.from({ length: 4 }).map((_, c) => (
                  <Cylinder
                    key={`cable-${c}`}
                    args={[0.03, 0.03, 3.5, 8]}
                    position={[0.95, 2, -0.3 + c * 0.15]}
                  >
                    <meshStandardMaterial
                      color={c % 2 === 0 ? "#0066ff" : "#00ff88"}
                      metalness={0.2}
                      roughness={0.8}
                    />
                  </Cylinder>
                ))}
              </group>
            );
          })}

          {/* MONITORPULT vor den Servern */}
          <group position={[0, 0, 6]} rotation={[0, 0, 0]}>
            {/* Pult-Basis */}
            <RoundedBox args={[3.5, 1.2, 1.8]} position={[0, 0.6, 0]}>
              <meshStandardMaterial
                color="#2c3e50"
                metalness={0.3}
                roughness={0.7}
              />
            </RoundedBox>

            {/* Monitor-Bildschirme (3 Monitore) */}
            {Array.from({ length: 3 }).map((_, i) => {
              const x = (i - 1) * 1.0;
              return (
                <group key={i} position={[x, 1.8, -0.3]}>
                  {/* Monitor-Rahmen */}
                  <Box args={[0.8, 0.6, 0.1]} position={[0, 0, 0]}>
                    <meshStandardMaterial
                      color="#1a1a1a"
                      metalness={0.1}
                      roughness={0.9}
                    />
                  </Box>
                  {/* Bildschirm */}
                  <Box args={[0.75, 0.55, 0.05]} position={[0, 0, 0.05]}>
                    <meshStandardMaterial
                      color="#000033"
                      emissive="#002255"
                      emissiveIntensity={0.3}
                      metalness={0.8}
                      roughness={0.1}
                    />
                  </Box>
                  {/* Monitor-Standfuß */}
                  <Box args={[0.1, 0.4, 0.1]} position={[0, -0.5, 0]}>
                    <meshStandardMaterial
                      color="#333333"
                      metalness={0.4}
                      roughness={0.6}
                    />
                  </Box>
                </group>
              );
            })}

            {/* Tastatur */}
            <Box args={[1.2, 0.05, 0.4]} position={[0, 1.25, 0.4]}>
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.2}
                roughness={0.8}
              />
            </Box>

            {/* Maus */}
            <RoundedBox args={[0.08, 0.03, 0.12]} position={[0.7, 1.27, 0.4]}>
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.2}
                roughness={0.8}
              />
            </RoundedBox>
          </group>
        </group>
      );
    }

    // Spezielle Resume Station mit Server-Schrank und hockender Person
    if (type === "resume") {
      return (
        <group position={pos} rotation={[0, Math.PI / 8, 0]} ref={stationRef}>
          {" "}
          {/* 22.5° = π/8 nach rechts */}
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 6, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-gray-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-gray-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-gray-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}
          {/* HAUPTSERVER-SCHRANK MIT INTEGRIERTEM MONITOR-PULT */}
          <group position={[0, 0, 0]}>
            {/* Server-Rack Schrank */}
            <RoundedBox args={[2.5, 4, 1.2]} position={[0, 2, 0]}>
              <meshStandardMaterial
                color="#1a1a2e"
                metalness={0.7}
                roughness={0.3}
              />
            </RoundedBox>

            {/* Server-Einschübe mit LED-Lichtern */}
            {Array.from({ length: 12 }).map((_, i) => {
              const yPos = 3.7 - i * 0.3;
              return (
                <group key={`server-${i}`}>
                  {/* Server-Einheit */}
                  <Box args={[2.3, 0.25, 1]} position={[0, yPos, 0.05]}>
                    <meshStandardMaterial
                      color="#2c2c3e"
                      metalness={0.6}
                      roughness={0.4}
                    />
                  </Box>
                  {/* Status-LEDs */}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Sphere
                      key={`led-${j}`}
                      args={[0.03]}
                      position={[-0.9 + j * 0.15, yPos, 0.65]}
                    >
                      <meshStandardMaterial
                        color={
                          j === 0 ? "#00ff00" : j === 1 ? "#0088ff" : "#ff8800"
                        }
                        emissive={
                          j === 0 ? "#00ff00" : j === 1 ? "#0088ff" : "#ff8800"
                        }
                        emissiveIntensity={0.8}
                      />
                    </Sphere>
                  ))}
                </group>
              );
            })}

            {/* Lüftungsgitter oben */}
            {Array.from({ length: 8 }).map((_, i) => (
              <Box
                key={`vent-${i}`}
                args={[0.2, 0.05, 1]}
                position={[-0.9 + i * 0.25, 3.95, 0.05]}
              >
                <meshStandardMaterial
                  color="#0a0a1a"
                  metalness={0.5}
                  roughness={0.5}
                />
              </Box>
            ))}

            {/* INTEGRIERTES MONITOR-PULT (ausziehbar) */}
            <group position={[0, 1.2, 0.8]}>
              {/* Pult-Platte */}
              <RoundedBox args={[2.2, 0.08, 0.8]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.4}
                  roughness={0.6}
                />
              </RoundedBox>

              {/* Monitor auf dem Pult */}
              <group position={[0, 0.5, -0.15]}>
                {/* Monitor-Ständer */}
                <Cylinder args={[0.08, 0.08, 0.4, 12]} position={[0, 0.2, 0]}>
                  <meshStandardMaterial
                    color="#2c3e50"
                    metalness={0.6}
                    roughness={0.4}
                  />
                </Cylinder>

                {/* Monitor-Bildschirm */}
                <Box args={[1.2, 0.75, 0.08]} position={[0, 0.45, 0]}>
                  <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.2}
                    roughness={0.9}
                  />
                </Box>

                {/* Bildschirm-Display mit CV-Vorschau */}
                <Box args={[1.15, 0.7, 0.03]} position={[0, 0.45, 0.06]}>
                  <meshStandardMaterial
                    color="#003366"
                    emissive="#004488"
                    emissiveIntensity={0.3}
                  />
                </Box>

                {/* Download-Button auf dem Monitor */}
                <RoundedBox args={[0.3, 0.12, 0.02]} position={[0, 0.15, 0.08]}>
                  <meshStandardMaterial
                    color="#00aa44"
                    emissive="#00ff66"
                    emissiveIntensity={0.6}
                  />
                </RoundedBox>
              </group>

              {/* Tastatur */}
              <Box args={[1, 0.04, 0.35]} position={[0, 0.06, 0.2]}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Box>

              {/* Maus */}
              <RoundedBox args={[0.07, 0.03, 0.1]} position={[0.6, 0.06, 0.2]}>
                <meshStandardMaterial
                  color="#2c2c2c"
                  metalness={0.4}
                  roughness={0.6}
                />
              </RoundedBox>
            </group>

            {/* HOCKENDE PERSON AN DER SERVERANLAGE */}
            <group position={[1.8, 0, 0.3]} rotation={[0, -Math.PI / 4, 0]}>
              {/* Körper (hockend) */}
              <Cylinder args={[0.25, 0.3, 0.8, 12]} position={[0, 0.6, 0]}>
                <meshStandardMaterial
                  color="#0066cc"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Cylinder>

              {/* Kopf */}
              <Sphere args={[0.22]} position={[0, 1.15, 0]}>
                <meshStandardMaterial
                  color="#ffdbac"
                  metalness={0.1}
                  roughness={0.95}
                />
              </Sphere>

              {/* Oberkörper nach vorne gebeugt */}
              <Box
                args={[0.5, 0.6, 0.3]}
                position={[0, 0.9, 0.15]}
                rotation={[0.3, 0, 0]}
              >
                <meshStandardMaterial
                  color="#0066cc"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Box>

              {/* Arme (arbeitet am Server) */}
              <Cylinder
                args={[0.08, 0.08, 0.5, 8]}
                position={[-0.3, 0.8, 0.4]}
                rotation={[Math.PI / 3, 0, Math.PI / 6]}
              >
                <meshStandardMaterial
                  color="#0066cc"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Cylinder>
              <Cylinder
                args={[0.08, 0.08, 0.5, 8]}
                position={[0.3, 0.8, 0.4]}
                rotation={[Math.PI / 3, 0, -Math.PI / 6]}
              >
                <meshStandardMaterial
                  color="#0066cc"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Cylinder>

              {/* Hände am Server */}
              <Sphere args={[0.08]} position={[-0.5, 0.6, 0.7]}>
                <meshStandardMaterial color="#ffdbac" />
              </Sphere>
              <Sphere args={[0.08]} position={[0.5, 0.6, 0.7]}>
                <meshStandardMaterial color="#ffdbac" />
              </Sphere>

              {/* Beine (gehockt) */}
              <Cylinder
                args={[0.1, 0.1, 0.5, 8]}
                position={[-0.15, 0.25, -0.1]}
                rotation={[-Math.PI / 2.5, 0, 0]}
              >
                <meshStandardMaterial
                  color="#003366"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Cylinder>
              <Cylinder
                args={[0.1, 0.1, 0.5, 8]}
                position={[0.15, 0.25, -0.1]}
                rotation={[-Math.PI / 2.5, 0, 0]}
              >
                <meshStandardMaterial
                  color="#003366"
                  metalness={0.1}
                  roughness={0.9}
                />
              </Cylinder>

              {/* Füße */}
              <Box args={[0.12, 0.08, 0.18]} position={[-0.15, 0.04, 0.15]}>
                <meshStandardMaterial color="#1a1a1a" />
              </Box>
              <Box args={[0.12, 0.08, 0.18]} position={[0.15, 0.04, 0.15]}>
                <meshStandardMaterial color="#1a1a1a" />
              </Box>

              {/* Werkzeugkasten neben der Person */}
              <RoundedBox args={[0.4, 0.2, 0.3]} position={[-0.6, 0.1, -0.3]}>
                <meshStandardMaterial
                  color="#cc3333"
                  metalness={0.5}
                  roughness={0.5}
                />
              </RoundedBox>
            </group>

            {/* Kabelmanagement an der Seite */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Cylinder
                key={`cable-${i}`}
                args={[0.04, 0.04, 3.5, 8]}
                position={[1.3, 2, -0.4 + i * 0.15]}
                rotation={[0, 0, 0]}
              >
                <meshStandardMaterial
                  color={i % 2 === 0 ? "#0066ff" : "#00ff88"}
                  metalness={0.2}
                  roughness={0.8}
                />
              </Cylinder>
            ))}

            {/* Bodengitter für Kühlung */}
            <RoundedBox args={[3, 0.05, 1.5]} position={[0, 0.03, 0]}>
              <meshStandardMaterial
                color="#0a0a1a"
                metalness={0.8}
                roughness={0.2}
              />
            </RoundedBox>
          </group>
        </group>
      );
    }

    // Spezielle Testimonials Station mit Bewertungen
    if (type === "testimonials") {
      return (
        <group position={pos} ref={stationRef} rotation={[0, Math.PI / 4, 0]}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 6, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-orange-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-orange-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-orange-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* HAUPTPODEST */}
          <RoundedBox args={[5, 0.3, 5]} position={[0, 0.15, 0]}>
            <meshStandardMaterial
              color="#2a2a3e"
              metalness={0.5}
              roughness={0.5}
            />
          </RoundedBox>

          {/* TESTIMONIAL-KARTEN ALS 3 DISPLAYS */}
          {[-1.5, 0, 1.5].map((xPos, i) => (
            <group key={`testimonial-${i}`} position={[xPos, 1, 0]}>
              {/* Kartenständer */}
              <Cylinder args={[0.15, 0.15, 1.5, 16]} position={[0, 0.75, 0]}>
                <meshStandardMaterial
                  color="#3a3a4e"
                  metalness={0.7}
                  roughness={0.3}
                />
              </Cylinder>

              {/* Display-Karte */}
              <RoundedBox args={[1.2, 2.2, 0.1]} position={[0, 2.3, 0]}>
                <meshStandardMaterial
                  color="#1a1a2e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </RoundedBox>

              {/* Leuchtender Bildschirm */}
              <Box args={[1.1, 2.0, 0.05]} position={[0, 2.3, 0.08]}>
                <meshStandardMaterial
                  color="#ff9900"
                  emissive="#ff9900"
                  emissiveIntensity={0.3}
                />
              </Box>

              {/* 5-Sterne-Bewertung über dem Display */}
              {[0, 1, 2, 3, 4].map((star) => (
                <group
                  key={`star-${star}`}
                  position={[-0.4 + star * 0.2, 3.5, 0.1]}
                >
                  {/* Stern mit 5 Zacken */}
                  {Array.from({ length: 5 }).map((_, point) => {
                    const angle = (point / 5) * Math.PI * 2 - Math.PI / 2;
                    const radius = point % 2 === 0 ? 0.08 : 0.04;
                    return (
                      <Cone
                        key={`point-${point}`}
                        args={[0.03, 0.1, 3]}
                        position={[
                          Math.cos(angle) * radius,
                          Math.sin(angle) * radius,
                          0,
                        ]}
                        rotation={[0, 0, angle + Math.PI / 2]}
                      >
                        <meshStandardMaterial
                          color="#ffcc00"
                          emissive="#ffcc00"
                          emissiveIntensity={0.8}
                        />
                      </Cone>
                    );
                  })}
                </group>
              ))}

              {/* Anführungszeichen-Symbol */}
              <Torus
                args={[0.15, 0.05, 8, 16, Math.PI]}
                position={[-0.35, 3.0, 0.15]}
                rotation={[0, 0, Math.PI]}
              >
                <meshStandardMaterial
                  color="#ffaa00"
                  emissive="#ffaa00"
                  emissiveIntensity={0.6}
                />
              </Torus>
              <Torus
                args={[0.15, 0.05, 8, 16, Math.PI]}
                position={[0.35, 3.0, 0.15]}
                rotation={[0, 0, Math.PI]}
              >
                <meshStandardMaterial
                  color="#ffaa00"
                  emissive="#ffaa00"
                  emissiveIntensity={0.6}
                />
              </Torus>
            </group>
          ))}

          {/* ZENTRALE BELEUCHTUNG */}
          <Sphere args={[0.3]} position={[0, 4.5, 0]}>
            <meshStandardMaterial
              color="#ff9900"
              emissive="#ff9900"
              emissiveIntensity={1.0}
            />
          </Sphere>

          {/* AKZENT-LICHTER AN DEN ECKEN */}
          {[
            [-2, 0, -2],
            [2, 0, -2],
            [-2, 0, 2],
            [2, 0, 2],
          ].map(([x, y, z], i) => (
            <Cylinder
              key={`light-${i}`}
              args={[0.1, 0.15, 0.8, 16]}
              position={[x, 0.4, z]}
            >
              <meshStandardMaterial
                color="#ff9900"
                emissive="#ff9900"
                emissiveIntensity={0.7}
              />
            </Cylinder>
          ))}
        </group>
      );
    }

    // Spezielle About Me Station mit Schreibtisch-Setup
    if (type === "about") {
      return (
        <group position={pos} ref={stationRef}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 6, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-cyan-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-cyan-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-cyan-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* MODERNER SCHREIBTISCH */}
          <group position={[0, 0, 0]} rotation={[0, -Math.PI / 6, 0]}>
            {/* Tischplatte */}
            <RoundedBox args={[7.0, 0.2, 3.5]} position={[0, 1.8, 0]}>
              <meshStandardMaterial
                color="#1a1a2e"
                metalness={0.3}
                roughness={0.7}
              />
            </RoundedBox>

            {/* Tischbeine */}
            {[
              [-3.2, -1.6],
              [3.2, -1.6],
              [-3.2, 1.6],
              [3.2, 1.6],
            ].map(([x, z], i) => (
              <Cylinder
                key={`leg-${i}`}
                args={[0.12, 0.12, 1.8, 12]}
                position={[x, 0.9, z]}
              >
                <meshStandardMaterial
                  color="#2c2c3e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Cylinder>
            ))}

            {/* MONITOR (realistisch) */}
            <group position={[0, 1.9, -0.8]}>
              {/* Monitor-Basis auf Tisch */}
              <Cylinder args={[0.35, 0.35, 0.05, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#2c3e50"
                  metalness={0.7}
                  roughness={0.3}
                />
              </Cylinder>

              {/* Monitor-Ständer */}
              <Cylinder args={[0.25, 0.3, 0.8, 16]} position={[0, 0.4, 0]}>
                <meshStandardMaterial
                  color="#2c3e50"
                  metalness={0.7}
                  roughness={0.3}
                />
              </Cylinder>

              {/* Monitor-Rahmen (65 Zoll ≈ 2.8m breit) */}
              <RoundedBox args={[2.8, 1.7, 0.2]} position={[0, 1.6, 0]}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.5}
                  roughness={0.5}
                />
              </RoundedBox>

              {/* Monitor-Bildschirm (leuchtend) */}
              <Box args={[2.7, 1.6, 0.07]} position={[0, 1.6, 0.12]}>
                <meshStandardMaterial
                  color="#00d4ff"
                  emissive="#00aaff"
                  emissiveIntensity={0.5}
                />
              </Box>

              {/* Monitor-Details - Webcam */}
              <Sphere args={[0.07]} position={[0, 2.5, 0.2]}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>
            </group>

            {/* TASTATUR */}
            <RoundedBox args={[2.0, 0.1, 0.7]} position={[0, 2.03, 0.7]}>
              <meshStandardMaterial
                color="#2c2c3e"
                metalness={0.4}
                roughness={0.6}
              />
            </RoundedBox>

            {/* Tasten-Details */}
            {Array.from({ length: 60 }).map((_, i) => {
              const row = Math.floor(i / 15);
              const col = i % 15;
              return (
                <Box
                  key={`key-${i}`}
                  args={[0.11, 0.05, 0.11]}
                  position={[-0.92 + col * 0.13, 2.1, 0.35 + row * 0.14]}
                >
                  <meshStandardMaterial
                    color="#3a3a4e"
                    metalness={0.3}
                    roughness={0.8}
                  />
                </Box>
              );
            })}

            {/* MAUS */}
            <RoundedBox args={[0.17, 0.07, 0.25]} position={[1.7, 1.98, 1.1]}>
              <meshStandardMaterial
                color="#1a1a2e"
                metalness={0.5}
                roughness={0.5}
              />
            </RoundedBox>

            {/* PFLANZE (links vorne) */}
            <group position={[-2.7, 2.1, 1.3]}>
              {/* Topf */}
              <Cylinder args={[0.28, 0.22, 0.35, 16]} position={[0, 0.18, 0]}>
                <meshStandardMaterial
                  color="#00aaff"
                  metalness={0.3}
                  roughness={0.7}
                />
              </Cylinder>

              {/* Pflanze - Blätter */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                  <Cone
                    key={`leaf-${i}`}
                    args={[0.4, 1.0, 8]}
                    position={[
                      Math.cos(angle) * 0.4,
                      1.0 + Math.sin(i) * 0.25,
                      Math.sin(angle) * 0.4,
                    ]}
                    rotation={[Math.PI / 6, angle, 0]}
                  >
                    <meshStandardMaterial
                      color="#00ff88"
                      metalness={0.2}
                      roughness={0.8}
                    />
                  </Cone>
                );
              })}
            </group>

            {/* GAMING-STUHL (hinter dem Tisch) */}
            <group position={[0, 0.85, 2.7]} rotation={[0, 0, 0]}>
              {/* Sitzfläche */}
              <RoundedBox args={[1.5, 0.35, 1.5]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#1a4d6f"
                  metalness={0.3}
                  roughness={0.7}
                />
              </RoundedBox>

              {/* Rückenlehne */}
              <RoundedBox args={[1.5, 2.1, 0.2]} position={[0, 1.1, -0.7]}>
                <meshStandardMaterial
                  color="#1a4d6f"
                  metalness={0.3}
                  roughness={0.7}
                />
              </RoundedBox>

              {/* Armlehnen */}
              {[-0.85, 0.85].map((x, i) => (
                <group key={`armrest-${i}`}>
                  <Box args={[0.17, 1.0, 1.0]} position={[x, 0, 0]}>
                    <meshStandardMaterial
                      color="#0d2d3f"
                      metalness={0.5}
                      roughness={0.5}
                    />
                  </Box>
                  <RoundedBox args={[0.2, 0.1, 0.75]} position={[x, 0.5, 0]}>
                    <meshStandardMaterial
                      color="#1a4d6f"
                      metalness={0.3}
                      roughness={0.7}
                    />
                  </RoundedBox>
                </group>
              ))}

              {/* Stuhl-Säule */}
              <Cylinder args={[0.14, 0.14, 0.85, 16]} position={[0, -0.425, 0]}>
                <meshStandardMaterial
                  color="#34495e"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Cylinder>

              {/* Stuhl-Basis mit Rädern */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i / 5) * Math.PI * 2;
                return (
                  <group key={`wheel-${i}`}>
                    {/* Speiche */}
                    <Cylinder
                      args={[0.1, 0.1, 1.05, 8]}
                      position={[
                        Math.cos(angle) * 0.52,
                        -0.95,
                        Math.sin(angle) * 0.52,
                      ]}
                      rotation={[0, 0, Math.PI / 2]}
                    >
                      <meshStandardMaterial
                        color="#2c3e50"
                        metalness={0.7}
                        roughness={0.3}
                      />
                    </Cylinder>

                    {/* Rad */}
                    <Sphere
                      args={[0.17]}
                      position={[
                        Math.cos(angle) * 1.05,
                        -1.0,
                        Math.sin(angle) * 1.05,
                      ]}
                    >
                      <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.4}
                        roughness={0.8}
                      />
                    </Sphere>
                  </group>
                );
              })}
            </group>

            {/* PC TOWER (rechts auf dem Tisch) */}
            <group position={[2.5, 1.9, -0.5]}>
              {/* Tower-Gehäuse */}
              <RoundedBox args={[0.5, 1.2, 0.8]} position={[0, 0.6, 0]}>
                <meshStandardMaterial
                  color="#1a1a2e"
                  metalness={0.6}
                  roughness={0.4}
                />
              </RoundedBox>

              {/* Frontpanel */}
              <Box args={[0.48, 1.18, 0.02]} position={[0, 0.6, 0.41]}>
                <meshStandardMaterial
                  color="#0d0d1a"
                  metalness={0.7}
                  roughness={0.3}
                />
              </Box>

              {/* RGB LED Streifen vorne */}
              <Box args={[0.45, 0.05, 0.01]} position={[0, 0.3, 0.42]}>
                <meshStandardMaterial
                  color="#00aaff"
                  emissive="#00aaff"
                  emissiveIntensity={0.8}
                />
              </Box>

              {/* Tempered Glass Seitenpanel mit RGB */}
              <Box args={[0.02, 1.0, 0.7]} position={[0.26, 0.6, 0]}>
                <meshStandardMaterial
                  color="#1a4d6f"
                  metalness={0.9}
                  roughness={0.1}
                  transparent={true}
                  opacity={0.6}
                />
              </Box>

              {/* Lüftungsgitter oben */}
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={`vent-${i}`}
                  args={[0.4, 0.02, 0.05]}
                  position={[0, 1.15, -0.3 + i * 0.15]}
                >
                  <meshStandardMaterial
                    color="#0d0d1a"
                    metalness={0.8}
                    roughness={0.3}
                  />
                </Box>
              ))}
            </group>

            {/* LED-STRIP unter dem Tisch */}
            <Box args={[6.9, 0.04, 0.04]} position={[0, 1.78, 1.7]}>
              <meshStandardMaterial
                color="#00aaff"
                emissive="#00aaff"
                emissiveIntensity={0.8}
              />
            </Box>
          </group>
        </group>
      );
    }

    // Spezielle Skills Station mit Industrieroboter
    if (type === "skills") {
      const robotBaseRef = useRef<Group>(null);
      const lowerArmRef = useRef<Group>(null);
      const middleArmRef = useRef<Group>(null);
      const upperArmRef = useRef<Group>(null);
      const gripperRef = useRef<Group>(null);
      const cubeRef = useRef<Group>(null);

      // Komplexe Roboter-Animation mit Pick-and-Place Zyklus
      useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const cycleTime = time % 10; // 10 Sekunden pro Zyklus

        // Phase 1 (0-1s): Zur Aufnahme-Position drehen
        // Phase 2 (1-2s): RUNTERFAHREN zum Würfel
        // Phase 3 (2-2.5s): GREIFEN (Greifer schließt)
        // Phase 4 (2.5-3.5s): HOCHFAHREN mit Würfel
        // Phase 5 (3.5-5.5s): ZUR ABLAGE DREHEN (90°)
        // Phase 6 (5.5-6.5s): RUNTERFAHREN zur Ablage
        // Phase 7 (6.5-7s): ABSETZEN (Greifer öffnet)
        // Phase 8 (7-8s): HOCHFAHREN ohne Würfel
        // Phase 9 (8-10s): ZURÜCK zur Start-Position drehen

        let baseRotation = 0;
        let lowerArmRotation = 0; // neutral aufrecht
        let middleArmRotation = 0; // neutral
        let upperArmRotation = 0; // neutral
        let gripAngle = 0.6; // offen
        let cubeIsHeld = false;

        if (cycleTime < 1) {
          // Phase 1: Zur linken Aufnahme-Position drehen
          const t = cycleTime / 1;
          baseRotation = -0.85 * t;
          lowerArmRotation = 0;
          middleArmRotation = 0;
          upperArmRotation = 0;
          gripAngle = 0.6;
          cubeIsHeld = false;
        } else if (cycleTime < 2) {
          // Phase 2: RUNTERFAHREN zum Würfel
          const t = (cycleTime - 1) / 1;
          baseRotation = -0.85;
          lowerArmRotation = 0.7 * t; // stärker bis 0.7
          middleArmRotation = 1.0 * t; // stärker bis 1.0
          upperArmRotation = 1.3 * t; // noch stärker bis 1.3
          gripAngle = 0.6;
          cubeIsHeld = false;
        } else if (cycleTime < 2.5) {
          // Phase 3: GREIFEN - Greifer schließt sich
          const t = (cycleTime - 2) / 0.5;
          baseRotation = -0.85;
          lowerArmRotation = 0.7;
          middleArmRotation = 1.0;
          upperArmRotation = 1.3;
          gripAngle = 0.6 - 0.55 * t;
          cubeIsHeld = t > 0.5;
        } else if (cycleTime < 3.5) {
          // Phase 4: HOCHFAHREN mit Würfel
          const t = (cycleTime - 2.5) / 1;
          baseRotation = -0.85;
          lowerArmRotation = 0.7 - 0.7 * t;
          middleArmRotation = 1.0 - 1.0 * t;
          upperArmRotation = 1.3 - 1.3 * t;
          gripAngle = 0.05;
          cubeIsHeld = true;
        } else if (cycleTime < 5.5) {
          // Phase 5: ZUR ABLAGE DREHEN (von links nach rechts)
          const t = (cycleTime - 3.5) / 2;
          baseRotation = -0.85 + 1.7 * t; // bis +0.85
          lowerArmRotation = 0;
          middleArmRotation = 0;
          upperArmRotation = 0;
          gripAngle = 0.05;
          cubeIsHeld = true;
        } else if (cycleTime < 6.5) {
          // Phase 6: RUNTERFAHREN zur Ablage
          const t = (cycleTime - 5.5) / 1;
          baseRotation = 0.85;
          lowerArmRotation = 0.7 * t;
          middleArmRotation = 1.0 * t;
          upperArmRotation = 1.3 * t;
          gripAngle = 0.05; // geschlossen
          cubeIsHeld = true;
        } else if (cycleTime < 7) {
          // Phase 7: ABSETZEN - Greifer öffnet sich
          const t = (cycleTime - 6.5) / 0.5;
          baseRotation = 0.85;
          lowerArmRotation = 0.7;
          middleArmRotation = 1.0;
          upperArmRotation = 1.3;
          gripAngle = 0.05 + 0.55 * t;
          cubeIsHeld = t < 0.5;
        } else if (cycleTime < 8) {
          // Phase 8: HOCHFAHREN ohne Würfel
          const t = (cycleTime - 7) / 1;
          baseRotation = 0.85;
          lowerArmRotation = 0.7 - 0.7 * t;
          middleArmRotation = 1.0 - 1.0 * t;
          upperArmRotation = 1.3 - 1.3 * t;
          gripAngle = 0.6;
          cubeIsHeld = false;
        } else {
          // Phase 9: ZURÜCK zur Start-Position drehen
          const t = (cycleTime - 8) / 2;
          baseRotation = 0.85 - 0.85 * t;
          lowerArmRotation = 0;
          middleArmRotation = 0;
          upperArmRotation = 0;
          gripAngle = 0.6;
          cubeIsHeld = false;
        }

        // Anwenden der berechneten Rotationen
        if (robotBaseRef.current) {
          robotBaseRef.current.rotation.y = baseRotation;
        }

        if (lowerArmRef.current) {
          lowerArmRef.current.rotation.z = lowerArmRotation;
        }

        if (middleArmRef.current) {
          middleArmRef.current.rotation.z = middleArmRotation;
        }

        if (upperArmRef.current) {
          upperArmRef.current.rotation.z = upperArmRotation;
        }

        // Greifer-Backen animieren
        if (gripperRef.current && gripperRef.current.children.length > 2) {
          gripperRef.current.children[2]?.rotation.set(0, 0, -gripAngle); // Linke Backe
          gripperRef.current.children[3]?.rotation.set(0, 0, gripAngle); // Rechte Backe
        }

        // Würfel-Position: folgt dem Greifer oder liegt auf Plattform
        if (cubeRef.current && gripperRef.current) {
          if (cubeIsHeld) {
            // Würfel wird vom Greifer gehalten - folgt der Greifer-Position
            // Berechne Weltposition des Greifers durch die Gelenke

            // Basis-Position
            const baseY = 1.2;

            // Unterer Arm (1.5m lang, rotiert um Z)
            const lowerArmLength = 1.5;
            const lowerX = Math.sin(lowerArmRotation) * lowerArmLength;
            const lowerY = Math.cos(lowerArmRotation) * lowerArmLength;

            // Mittlerer Arm (1.4m lang, rotiert relativ zum unteren Arm)
            const middleArmLength = 1.4;
            const totalMiddleRotation = lowerArmRotation + middleArmRotation;
            const middleX = Math.sin(totalMiddleRotation) * middleArmLength;
            const middleY = Math.cos(totalMiddleRotation) * middleArmLength;

            // Oberer Arm (1.2m lang, rotiert relativ zum mittleren Arm)
            const upperArmLength = 1.2;
            const totalUpperRotation = totalMiddleRotation + upperArmRotation;
            const upperX = Math.sin(totalUpperRotation) * upperArmLength;
            const upperY = Math.cos(totalUpperRotation) * upperArmLength;

            // Greifer-Offset (1.5m vom oberen Arm)
            const gripperLength = 1.5;
            const gripperX = Math.sin(totalUpperRotation) * gripperLength;
            const gripperY = Math.cos(totalUpperRotation) * gripperLength;

            // Gesamt-Position im rotierenden Basis-System
            const totalX = lowerX + middleX + upperX + gripperX;
            const totalY = baseY + lowerY + middleY + upperY + gripperY + 0.5;

            // Rotiere um Basis-Rotation - KORRIGIERT: X wird zu Z!
            const finalX = Math.sin(baseRotation) * totalX;
            const finalZ = Math.cos(baseRotation) * totalX;

            cubeRef.current.visible = true;
            cubeRef.current.position.set(finalX, totalY, finalZ);
            cubeRef.current.rotation.y = baseRotation;
          } else {
            // Würfel liegt auf der Plattform
            cubeRef.current.visible = true;
            cubeRef.current.rotation.y = 0;

            if (cycleTime < 2.5) {
              // Würfel wartet links auf Aufnahme
              cubeRef.current.position.set(-2.8, 0.65, 0);
            } else {
              // Würfel liegt rechts nach Ablage
              cubeRef.current.position.set(2.8, 0.65, 0);
            }
          }
        }
      });

      return (
        <group position={pos} ref={stationRef}>
          {/* STATION NAME LABEL - Versteckt wenn Station aktiv ist */}
          {!activeStation && (
            <Html position={[0, 6, 0]} center distanceFactor={10}>
              <div
                className="bg-black/90 backdrop-blur-md border border-red-400/50 rounded-lg px-12 py-6 pointer-events-auto cursor-pointer hover:bg-red-400/20 transition-all duration-300 hover:scale-105"
                onClick={() => activateStation(type as any)}
              >
                <h3 className="text-red-400 font-bold text-4xl whitespace-nowrap">
                  {name}
                </h3>
              </div>
            </Html>
          )}

          {/* INDUSTRIE-ROBOTERARM */}
          <group position={[0, 0, 0]} ref={robotBaseRef}>
            {/* Robuste Basis-Plattform */}
            <Cylinder args={[1.2, 1.4, 0.4, 32]} position={[0, 0.2, 0]}>
              <meshStandardMaterial
                color="#2c3e50"
                metalness={0.8}
                roughness={0.2}
                envMapIntensity={1}
              />
            </Cylinder>

            {/* Basis-Details - Schrauben mit realistischem Metall */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = Math.cos(angle) * 1.1;
              const z = Math.sin(angle) * 1.1;
              return (
                <group key={`bolt-group-${i}`}>
                  <Cylinder
                    args={[0.08, 0.08, 0.12, 16]}
                    position={[x, 0.35, z]}
                  >
                    <meshStandardMaterial
                      color="#3a3a3a"
                      metalness={0.95}
                      roughness={0.1}
                    />
                  </Cylinder>
                  {/* Schraubenkopf */}
                  <Box args={[0.1, 0.04, 0.1]} position={[x, 0.42, z]}>
                    <meshStandardMaterial
                      color="#1a1a1a"
                      metalness={0.9}
                      roughness={0.2}
                    />
                  </Box>
                </group>
              );
            })}

            {/* Drehgelenk / Rotary Joint mit Details */}
            <Cylinder args={[0.5, 0.6, 0.8, 32]} position={[0, 0.8, 0]}>
              <meshStandardMaterial
                color="#34495e"
                metalness={0.85}
                roughness={0.2}
              />
            </Cylinder>

            {/* Gelenkdetails - Riffelung */}
            {Array.from({ length: 12 }).map((_, i) => (
              <Torus
                key={`ridge-${i}`}
                args={[0.52 + i * 0.02, 0.02, 8, 32]}
                position={[0, 0.5 + i * 0.05, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial
                  color="#95a5a6"
                  metalness={0.9}
                  roughness={0.1}
                />
              </Torus>
            ))}

            {/* Unterer Arm (1. Segment) - ANIMIERT - VERTIKAL */}
            <group
              ref={lowerArmRef}
              position={[0, 1.2, 0]}
              rotation={[0, 0, 0]}
            >
              {/* Hauptarm-Segment mit realistischer Textur */}
              <Box args={[0.4, 1.5, 0.4]} position={[0, 0.75, 0]}>
                <meshStandardMaterial
                  color="#c0392b"
                  metalness={0.7}
                  roughness={0.3}
                  envMapIntensity={1.2}
                />
              </Box>

              {/* Seitliche Verstärkung */}
              <Box args={[0.45, 1.4, 0.1]} position={[-0.25, 0.75, 0]}>
                <meshStandardMaterial
                  color="#e74c3c"
                  metalness={0.6}
                  roughness={0.4}
                />
              </Box>

              {/* Hydraulik-Zylinder mit Details */}
              <group position={[0.25, 0.75, 0]}>
                <Cylinder args={[0.15, 0.15, 1.3, 16]} position={[0, 0, 0]}>
                  <meshStandardMaterial
                    color="#95a5a6"
                    metalness={0.85}
                    roughness={0.15}
                  />
                </Cylinder>
                {/* Hydraulik-Kopplungen */}
                <Sphere args={[0.18]} position={[0, 0.65, 0]}>
                  <meshStandardMaterial
                    color="#7f8c8d"
                    metalness={0.9}
                    roughness={0.1}
                  />
                </Sphere>
                <Sphere args={[0.18]} position={[0, -0.65, 0]}>
                  <meshStandardMaterial
                    color="#7f8c8d"
                    metalness={0.9}
                    roughness={0.1}
                  />
                </Sphere>
              </group>

              {/* Ellbogen-Gelenk 1 */}
              <Sphere args={[0.35]} position={[0, 1.5, 0]}>
                <meshStandardMaterial
                  color="#7f8c8d"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>

              {/* Mittlerer Arm (2. Segment) - ANIMIERT */}
              <group
                ref={middleArmRef}
                position={[0, 1.5, 0]}
                rotation={[0, 0, 0]}
              >
                <Box args={[0.38, 1.4, 0.38]} position={[0, 0.7, 0]}>
                  <meshStandardMaterial
                    color="#c0392b"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </Box>

                {/* Seitliche Verstärkung */}
                <Box args={[0.43, 1.3, 0.1]} position={[-0.23, 0.7, 0]}>
                  <meshStandardMaterial
                    color="#e74c3c"
                    metalness={0.6}
                    roughness={0.4}
                  />
                </Box>

                {/* Hydraulik-Zylinder */}
                <group position={[0.23, 0.7, 0]}>
                  <Cylinder args={[0.13, 0.13, 1.2, 16]} position={[0, 0, 0]}>
                    <meshStandardMaterial
                      color="#95a5a6"
                      metalness={0.85}
                      roughness={0.15}
                    />
                  </Cylinder>
                  <Sphere args={[0.16]} position={[0, 0.6, 0]}>
                    <meshStandardMaterial
                      color="#7f8c8d"
                      metalness={0.9}
                      roughness={0.1}
                    />
                  </Sphere>
                  <Sphere args={[0.16]} position={[0, -0.6, 0]}>
                    <meshStandardMaterial
                      color="#7f8c8d"
                      metalness={0.9}
                      roughness={0.1}
                    />
                  </Sphere>
                </group>

                {/* Ellbogen-Gelenk 2 */}
                <Sphere args={[0.32]} position={[0, 1.4, 0]}>
                  <meshStandardMaterial
                    color="#7f8c8d"
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>

                {/* Oberer Arm (3. Segment) - ANIMIERT */}
                <group
                  ref={upperArmRef}
                  position={[0, 1.4, 0]}
                  rotation={[0, 0, 0]}
                >
                  <Box args={[0.33, 1.2, 0.33]} position={[0, 0.6, 0]}>
                    <meshStandardMaterial
                      color="#c0392b"
                      metalness={0.7}
                      roughness={0.3}
                    />
                  </Box>

                  {/* Kabel und Schläuche am Arm - realistischer */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Cylinder
                      key={`cable-${i}`}
                      args={[0.04, 0.04, 1.1, 12]}
                      position={[-0.18 + i * 0.09, 0.6, 0.18]}
                    >
                      <meshStandardMaterial
                        color={
                          i === 0 ? "#2c3e50" : i === 1 ? "#f39c12" : "#3498db"
                        }
                      />
                    </Cylinder>
                  ))}

                  {/* Handgelenk */}
                  <Sphere args={[0.25]} position={[0, 1.2, 0]}>
                    <meshStandardMaterial
                      color="#95a5a6"
                      metalness={0.8}
                      roughness={0.2}
                    />
                  </Sphere>

                  {/* End-Effektor / Greifer - ANIMIERT */}
                  <group ref={gripperRef} position={[0, 1.5, 0]}>
                    {/* Greifer-Basis mit Details */}
                    <Cylinder
                      args={[0.15, 0.2, 0.3, 16]}
                      position={[0, 0.15, 0]}
                    >
                      <meshStandardMaterial
                        color="#34495e"
                        metalness={0.85}
                        roughness={0.2}
                      />
                    </Cylinder>

                    {/* Pneumatik-Anschlüsse */}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <Cylinder
                        key={`pneumatic-${i}`}
                        args={[0.03, 0.03, 0.15, 8]}
                        position={[i === 0 ? -0.1 : 0.1, 0.3, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                      >
                        <meshStandardMaterial
                          color="#f39c12"
                          metalness={0.4}
                          roughness={0.6}
                        />
                      </Cylinder>
                    ))}

                    {/* Greifer-Backen (animiert öffnen/schließen) */}
                    <Box
                      args={[0.08, 0.5, 0.18]}
                      position={[-0.15, 0.45, 0]}
                      rotation={[0, 0, -0.3]}
                    >
                      <meshStandardMaterial
                        color="#7f8c8d"
                        metalness={0.9}
                        roughness={0.15}
                      />
                    </Box>
                    <Box
                      args={[0.08, 0.5, 0.18]}
                      position={[0.15, 0.45, 0]}
                      rotation={[0, 0, 0.3]}
                    >
                      <meshStandardMaterial
                        color="#7f8c8d"
                        metalness={0.9}
                        roughness={0.15}
                      />
                    </Box>

                    {/* Greifer-Backen Gummierung */}
                    <Box
                      args={[0.06, 0.45, 0.16]}
                      position={[-0.15, 0.45, 0]}
                      rotation={[0, 0, -0.3]}
                    >
                      <meshStandardMaterial
                        color="#2c3e50"
                        metalness={0.2}
                        roughness={0.9}
                      />
                    </Box>
                    <Box
                      args={[0.06, 0.45, 0.16]}
                      position={[0.15, 0.45, 0]}
                      rotation={[0, 0, 0.3]}
                    >
                      <meshStandardMaterial
                        color="#2c3e50"
                        metalness={0.2}
                        roughness={0.9}
                      />
                    </Box>
                  </group>
                </group>
              </group>
            </group>

            {/* Kontroll-Panel neben dem Roboter */}
            <group position={[2, 0, 0]}>
              {/* Panel-Ständer */}
              <Cylinder args={[0.08, 0.08, 1.5, 12]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#34495e" />
              </Cylinder>

              {/* Touchscreen-Panel */}
              <RoundedBox
                args={[0.8, 1.2, 0.1]}
                position={[0, 1.6, 0]}
                rotation={[0.1, 0, 0]}
              >
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.2}
                  roughness={0.9}
                />
              </RoundedBox>

              {/* Bildschirm-Display */}
              <Box
                args={[0.75, 1.15, 0.05]}
                position={[0, 1.6, 0.08]}
                rotation={[0.1, 0, 0]}
              >
                <meshStandardMaterial
                  color="#27ae60"
                  emissive="#27ae60"
                  emissiveIntensity={0.3}
                />
              </Box>

              {/* Status-LEDs auf dem Panel */}
              {Array.from({ length: 4 }).map((_, i) => (
                <Sphere
                  key={`led-${i}`}
                  args={[0.03]}
                  position={[-0.3 + i * 0.2, 2.3, 0.1]}
                >
                  <meshStandardMaterial
                    color={i < 2 ? "#2ecc71" : "#f39c12"}
                    emissive={i < 2 ? "#2ecc71" : "#f39c12"}
                    emissiveIntensity={0.8}
                  />
                </Sphere>
              ))}
            </group>

            {/* Boden-Markierung / Sicherheitsbereich */}
            <group position={[0, 0.01, 0]}>
              {/* Gelb-schwarze Warnstreifen */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = Math.cos(angle) * 2;
                const z = Math.sin(angle) * 2;
                return (
                  <Box
                    key={`warning-${i}`}
                    args={[0.3, 0.02, 0.5]}
                    position={[x, 0, z]}
                    rotation={[0, angle, 0]}
                  >
                    <meshStandardMaterial
                      color={i % 2 === 0 ? "#f39c12" : "#1a1a1a"}
                    />
                  </Box>
                );
              })}
            </group>

            {/* WÜRFEL - Dynamisch positioniert (im Greifer oder auf Plattform) */}
            <group ref={cubeRef} position={[-2.8, 0.65, 0]}>
              <RoundedBox args={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#ecf0f1"
                  metalness={0.4}
                  roughness={0.6}
                  envMapIntensity={1}
                />
              </RoundedBox>

              {/* Tech-Logo auf Würfel */}
              <Box args={[0.52, 0.2, 0.05]} position={[0, 0, 0.26]}>
                <meshStandardMaterial
                  color="#3498db"
                  emissive="#3498db"
                  emissiveIntensity={0.3}
                />
              </Box>
            </group>

            {/* Aufnahme-Plattform (links) */}
            <RoundedBox args={[1, 0.1, 1]} position={[-2.8, 0.4, 0]}>
              <meshStandardMaterial
                color="#34495e"
                metalness={0.6}
                roughness={0.4}
              />
            </RoundedBox>

            {/* Ablage-Plattform (rechts) */}
            <RoundedBox args={[1, 0.1, 1]} position={[2.8, 0.4, 0]}>
              <meshStandardMaterial
                color="#34495e"
                metalness={0.6}
                roughness={0.4}
              />
            </RoundedBox>
          </group>
        </group>
      );
    }

    // Alle anderen Stationen werden nicht mehr gerendert
    return null;
  };

  return (
    <>
      {/* STERNE-HINTERGRUND WIE IM ALL - AUSSERHALB DER ROTIERENDEN GRUPPE */}
      {Array.from({ length: 200 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        const size = Math.random() * 0.1 + 0.02;
        return (
          <Sphere key={i} args={[size]} position={[x, y, z]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={Math.random() * 0.8 + 0.2}
            />
          </Sphere>
        );
      })}

      {/* BEWEGLICHE PORTFOLIO-GRUPPE */}
      <group ref={groupRef} position={position}>
        {/* 60M x 60M GRID-GITTER - 2M QUADRATE */}
        {Array.from({ length: 31 }).map((_, i) => {
          const pos = -30 + i * 2;
          return (
            <group key={`grid-${i}`}>
              {/* Horizontale Linien */}
              <Box args={[60, 0.02, 0.02]} position={[0, 0.8, pos]}>
                <meshStandardMaterial
                  color="#666666"
                  metalness={0.7}
                  roughness={0.3}
                  transparent
                  opacity={0.8}
                />
              </Box>
              {/* Vertikale Linien */}
              <Box args={[0.02, 0.02, 60]} position={[pos, 0.8, 0]}>
                <meshStandardMaterial
                  color="#666666"
                  metalness={0.7}
                  roughness={0.3}
                  transparent
                  opacity={0.8}
                />
              </Box>
            </group>
          );
        })}

        {/* GRID-ECKEN PUNKTE */}
        {Array.from({ length: 31 })
          .map((_, i) =>
            Array.from({ length: 31 }).map((_, j) => {
              const x = -30 + i * 2;
              const z = -30 + j * 2;
              return (
                <Sphere
                  key={`point-${i}-${j}`}
                  args={[0.08]}
                  position={[x, 0.85, z]}
                >
                  <meshStandardMaterial
                    color="#aaaaaa"
                    emissive="#aaaaaa"
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Sphere>
              );
            })
          )
          .flat()}

        {/* ZENTRALE CPU - PROFESSIONELL & MINIMAL */}
        <group position={[0, 1, 0]}>
          <RoundedBox args={[3, 0.5, 3]}>
            <meshStandardMaterial
              color="#343a40"
              metalness={0.4}
              roughness={0.6}
            />
          </RoundedBox>
          <Box args={[2.8, 0.1, 2.8]} position={[0, 0.3, 0]}>
            <meshStandardMaterial
              color="#007bff"
              metalness={0.2}
              roughness={0.8}
            />
          </Box>
        </group>

        {/* PROFESSIONELLE STATIONEN */}
        {stations.map((station, index) => (
          <Station
            key={`station-${index}`}
            type={station.type}
            pos={station.pos as [number, number, number]}
            name={station.name}
            color={station.color}
          />
        ))}
      </group>
    </>
  );
}
