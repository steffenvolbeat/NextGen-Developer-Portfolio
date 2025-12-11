"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useStationManager,
  STATION_INFO,
  getStationColor,
} from "@/contexts/StationManager";
import { cn } from "@/lib/utils";

export const NavigationHUD: React.FC = () => {
  const { activeStation, activateStation } = useStationManager();

  return (
    <div className="fixed top-4 right-4 z-40 space-y-2 max-w-[200px]">
      {/* Navigation Compass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-4"
      >
        <h4 className="text-white font-medium mb-1 text-xs">NAV</h4>

        <div className="grid grid-cols-4 gap-1 mb-2">
          {Object.entries(STATION_INFO).map(([stationType, info]) => {
            const isActive = activeStation === stationType;

            return (
              <button
                key={stationType}
                onClick={() => activateStation(stationType as any)}
                className={cn(
                  "relative w-8 h-8 rounded border transition-all duration-200",
                  "flex items-center justify-center text-sm font-medium",
                  "hover:scale-110 hover:brightness-110",
                  isActive
                    ? "border-white bg-white/20 text-white shadow-lg scale-110"
                    : "border-white/30 bg-white/5 text-gray-400 hover:text-white"
                )}
                style={{
                  borderColor: isActive ? info.color : undefined,
                  backgroundColor: isActive ? info.color + "30" : undefined,
                  boxShadow: isActive ? `0 0 15px ${info.color}40` : undefined,
                }}
                title={info.name}
              >
                {info.icon}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Controls Info - Kompakt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-2"
      >
        <h4 className="text-white font-medium mb-1 text-xs">CONTROLS</h4>
        <div className="space-y-1 text-xs text-gray-300">
          <div className="flex items-center justify-between">
            <span>Kamera:</span>
            <span className="font-mono text-cyan-300">MAUS</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Station:</span>
            <span className="font-mono text-cyan-300">KLICK NAV</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
