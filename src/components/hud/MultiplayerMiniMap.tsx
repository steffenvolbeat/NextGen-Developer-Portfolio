"use client";

import { useState, useEffect } from "react";

interface MultiplayerMiniMapProps {
  visible: boolean;
  player1Position: [number, number, number];
  player2Position: [number, number, number];
}

/**
 * Multiplayer Mini-Map
 * Zeigt beide Spieler auf einer kleinen Motherboard-Karte
 */
export function MultiplayerMiniMap({
  visible,
  player1Position,
  player2Position,
}: MultiplayerMiniMapProps) {
  if (!visible) return null;

  // Motherboard ist 35x35, Mini-Map ist 120x120 Pixel
  const mapSize = 120;
  const boardSize = 35;
  const scale = mapSize / boardSize;

  // Konvertiere 3D-Positionen zu 2D-Mini-Map-Koordinaten
  const player1MapPos = {
    x: (player1Position[0] + boardSize / 2) * scale,
    y: (player1Position[2] + boardSize / 2) * scale,
  };

  const player2MapPos = {
    x: (player2Position[0] + boardSize / 2) * scale,
    y: (player2Position[2] + boardSize / 2) * scale,
  };

  // Station-Positionen für Mini-Map
  const stations = [
    {
      name: "TESTIMONIALS",
      x: (-12 + boardSize / 2) * scale,
      y: (-8 + boardSize / 2) * scale,
    },
    {
      name: "BACKSTAGE",
      x: (-12 + boardSize / 2) * scale,
      y: (8 + boardSize / 2) * scale,
    },
    {
      name: "WORKS",
      x: (0 + boardSize / 2) * scale,
      y: (14 + boardSize / 2) * scale,
    },
    {
      name: "CONTACT",
      x: (12 + boardSize / 2) * scale,
      y: (8 + boardSize / 2) * scale,
    },
    {
      name: "RESUME",
      x: (12 + boardSize / 2) * scale,
      y: (-8 + boardSize / 2) * scale,
    },
    {
      name: "EXPERIENCE",
      x: (-4 + boardSize / 2) * scale,
      y: (-14 + boardSize / 2) * scale,
    },
    {
      name: "SKILLS",
      x: (4 + boardSize / 2) * scale,
      y: (-14 + boardSize / 2) * scale,
    },
    {
      name: "ABOUT",
      x: (0 + boardSize / 2) * scale,
      y: (-16 + boardSize / 2) * scale,
    },
  ];

  return (
    <div className="absolute top-32 right-6 z-40 pointer-events-auto">
      <div className="bg-black/90 backdrop-blur-sm border border-cyan-400/50 rounded-lg p-3">
        <div className="text-cyan-400 text-xs font-mono mb-2 text-center">
          MINI-MAP
        </div>

        <div
          className="relative bg-linear-to-br from-gray-800 to-gray-900 border border-gray-600 rounded"
          style={{ width: mapSize, height: mapSize }}
        >
          {/* Motherboard-Grid */}
          <div className="absolute inset-0">
            {/* Grid-Lines */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`v-${i}`}>
                <div
                  className="absolute bg-cyan-400/20 w-px h-full"
                  style={{ left: `${i * 20}%` }}
                />
                <div
                  className="absolute bg-cyan-400/20 h-px w-full"
                  style={{ top: `${i * 20}%` }}
                />
              </div>
            ))}
          </div>

          {/* Stationen */}
          {stations.map((station, index) => (
            <div
              key={station.name}
              className="absolute w-2 h-2 bg-yellow-400/60 rounded-sm"
              style={{
                left: station.x - 4,
                top: station.y - 4,
                transform: "translate(50%, 50%)",
              }}
              title={station.name}
            />
          ))}

          {/* CPU (Zentrum) */}
          <div
            className="absolute w-3 h-3 bg-blue-500 rounded-full border border-blue-300"
            style={{
              left: mapSize / 2 - 6,
              top: mapSize / 2 - 6,
            }}
          />

          {/* Player 1 */}
          <div
            className="absolute w-3 h-3 bg-blue-400 rounded-full border-2 border-blue-200 animate-pulse"
            style={{
              left: Math.max(0, Math.min(mapSize - 12, player1MapPos.x - 6)),
              top: Math.max(0, Math.min(mapSize - 12, player1MapPos.y - 6)),
            }}
          />

          {/* Player 2 */}
          <div
            className="absolute w-3 h-3 bg-green-400 rounded-full border-2 border-green-200 animate-pulse"
            style={{
              left: Math.max(0, Math.min(mapSize - 12, player2MapPos.x - 6)),
              top: Math.max(0, Math.min(mapSize - 12, player2MapPos.y - 6)),
            }}
          />

          {/* Verbindungslinie zwischen Spielern */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <line
              x1={Math.max(6, Math.min(mapSize - 6, player1MapPos.x))}
              y1={Math.max(6, Math.min(mapSize - 6, player1MapPos.y))}
              x2={Math.max(6, Math.min(mapSize - 6, player2MapPos.x))}
              y2={Math.max(6, Math.min(mapSize - 6, player2MapPos.y))}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </div>

        {/* Legende */}
        <div className="mt-2 text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-blue-300">P1</span>
            <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
            <span className="text-green-300">P2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
