"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface BackstageStationProps {
  isActive: boolean;
  onClose: () => void;
}

export const BackstageStation: React.FC<BackstageStationProps> = ({
  isActive,
  onClose,
}) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-cyan-400/30 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-cyan-400/20 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              🎭 Backstage
            </motion.h1>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:border-red-400 hover:text-red-400"
            >
              ✕ Schließen
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-cyan-500/10 border-cyan-400/30 p-8 text-center">
              <div className="text-6xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Hinter den Kulissen
              </h2>
              <p className="text-gray-300">
                Hier entsteht bald exklusiver Backstage-Content:
                Entwicklungsprozesse, Behind-the-Scenes und mehr!
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
