"use client";

import { useState, useEffect } from "react";

interface MultiplayerInstructionsProps {
  visible: boolean;
  onClose?: () => void;
}

/**
 * Multiplayer Instructions Overlay
 * Zeigt Kontroll-Anweisungen für beide Spieler
 */
export function MultiplayerInstructions({
  visible,
  onClose,
}: MultiplayerInstructionsProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      // Auto-hide nach 8 Sekunden
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
      <div className="bg-black/90 border border-cyan-400/50 rounded-xl p-6 max-w-2xl mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            MULTIPLAYER MODUS AKTIVIERT
          </h2>
          <p className="text-cyan-400">
            Zwei Spieler können jetzt gemeinsam das Portfolio erkunden!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Player 1 Controls */}
          <div className="bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center">
              SPIELER 1
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Bewegung:</span>
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                    W
                  </kbd>
                  <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                    A
                  </kbd>
                  <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                    S
                  </kbd>
                  <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                    D
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Sprint:</span>
                <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                  SHIFT
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Sprung:</span>
                <kbd className="px-2 py-1 bg-blue-500/30 rounded text-xs font-mono text-white">
                  SPACE
                </kbd>
              </div>
            </div>
          </div>

          {/* Player 2 Controls */}
          <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-green-300 mb-4 text-center">
              SPIELER 2
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Bewegung:</span>
                <div className="flex space-x-1">
                  <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                    ↑
                  </kbd>
                  <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                    ←
                  </kbd>
                  <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                    ↓
                  </kbd>
                  <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                    →
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Sprint:</span>
                <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                  SHIFT
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Sprung:</span>
                <kbd className="px-2 py-1 bg-green-500/30 rounded text-xs font-mono text-white">
                  ENTER
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Tipps */}
        <div className="mt-6 bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
          <h4 className="text-yellow-300 font-semibold mb-2">TIPPS:</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>• Erkundet gemeinsam die verschiedenen Portfolio-Stationen</li>
            <li>• Nutzt Sprint (SHIFT) für schnellere Bewegung</li>
            <li>• Springt über Hindernisse mit SPACE/ENTER</li>
            <li>• Arbeitet zusammen, um alle Bereiche zu entdecken!</li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
          >
            VERSTANDEN
          </button>
        </div>

        {/* Auto-close indicator */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/60">
            Schließt automatisch in wenigen Sekunden...
          </p>
        </div>
      </div>
    </div>
  );
}
