"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface AboutStationProps {
  isActive: boolean;
  onClose: () => void;
}

export const AboutStation: React.FC<AboutStationProps> = ({
  isActive,
  onClose,
}) => {
  const [selectedValueIndex, setSelectedValueIndex] = useState<number | null>(
    null
  );
  const { about, personal } = portfolioData;

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-white/10 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Über mich
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

        <div className="p-6 space-y-8">
          {/* Hero Section with Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-8 items-center lg:items-start"
          >
            {/* Avatar */}
            <div className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-48 h-48 mx-auto lg:mx-0"
              >
                <div className="w-full h-full rounded-full bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Personal Info */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {personal.name}
                </h2>
                <p className="text-xl text-cyan-300 font-medium mb-4">
                  {personal.title}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-300">
                  <span>📍 {personal.location}</span>
                  <span>•</span>
                  <span>⚡ {personal.yearsOfExperience}+ Jahre Erfahrung</span>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-300 leading-relaxed max-w-2xl"
              >
                {personal.tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Meine Geschichte
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {about.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Meine Stärken
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="text-2xl">{highlight.split(" ")[0]}</div>
                  <div className="text-gray-300">
                    {highlight.substring(highlight.indexOf(" ") + 1)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Meine Werte
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {about.values?.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    setSelectedValueIndex(
                      selectedValueIndex === index ? null : index
                    )
                  }
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    selectedValueIndex === index ? "scale-105" : ""
                  )}
                >
                  <Card
                    variant="glass"
                    className={cn(
                      "p-6 text-center h-full hover:border-cyan-400/50 transition-colors",
                      selectedValueIndex === index &&
                        "border-cyan-400 bg-cyan-400/10"
                    )}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h4>
                    <AnimatePresence>
                      {(selectedValueIndex === index ||
                        selectedValueIndex === null) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-300 leading-relaxed"
                        >
                          {value.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              In Zahlen
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {personal.yearsOfExperience}+
                </div>
                <div className="text-sm text-gray-300">Jahre Erfahrung</div>
              </div>

              <div className="text-center p-6 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {personal.projects}+
                </div>
                <div className="text-sm text-gray-300">Projekte realisiert</div>
              </div>

              <div className="text-center p-6 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {personal.happyClients}+
                </div>
                <div className="text-sm text-gray-300">Zufriedene Kunden</div>
              </div>

              <div className="text-center p-6 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {personal.technologies}+
                </div>
                <div className="text-sm text-gray-300">Technologien</div>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-8"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-300">
                Bereit für ein Gespräch über Ihr nächstes Projekt?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  📧 Kontakt aufnehmen
                </Button>
                <Button variant="outline" size="lg">
                  💼 LinkedIn besuchen
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-900/10 via-blue-900/10 to-purple-900/10" />

          {/* Floating Orbs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1],
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-32 h-32 rounded-full bg-linear-to-r from-cyan-400/20 to-blue-400/20 blur-xl"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
