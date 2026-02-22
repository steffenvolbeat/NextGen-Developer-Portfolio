"use client";

import { useState, useEffect } from "react";

interface MultiplayerStatusProps {
  visible: boolean;
  player1Position?: [number, number, number];
  player2Position?: [number, number, number];
}

/**
 * Multiplayer Status Display
 * Zeigt Positionen und Status beider Spieler
 */
export function MultiplayerStatus({
  visible,
  player1Position = [0, 1.3, 0],
  player2Position = [-5, 1.3, -5],
}: MultiplayerStatusProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!visible) return null;

  const distance = Math.sqrt(
    Math.pow(player1Position[0] - player2Position[0], 2) +
      Math.pow(player1Position[2] - player2Position[2], 2)
  ).toFixed(1);

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
      <div
        className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 cursor-pointer hover:bg-black/90 transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center justify-center space-x-4">
          {/* Player 1 Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-mono">P1</span>
          </div>

          {/* Distance */}
          <div className="text-white text-sm font-mono">{distance}m</div>

          {/* Player 2 Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-mono">P2</span>
          </div>
        </div>

        {/* Detailed view */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              {/* Player 1 Details */}
              <div className="text-blue-300">
                <div className="font-semibold mb-1">SPIELER 1</div>
                <div className="font-mono text-white/80">
                  X: {player1Position[0].toFixed(1)}
                  <br />
                  Z: {player1Position[2].toFixed(1)}
                </div>
              </div>

              {/* Player 2 Details */}
              <div className="text-green-300">
                <div className="font-semibold mb-1">SPIELER 2</div>
                <div className="font-mono text-white/80">
                  X: {player2Position[0].toFixed(1)}
                  <br />
                  Z: {player2Position[2].toFixed(1)}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-white/60">
                Entfernung zwischen Spielern
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
