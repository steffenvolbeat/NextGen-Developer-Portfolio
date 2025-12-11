"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolio";

interface WelcomeStationProps {
  isActive: boolean;
  onNext: () => void;
}

export const WelcomeStation: React.FC<WelcomeStationProps> = ({
  isActive,
  onNext,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const welcomeTexts = [
    "Welcome to the Future",
    "Willkommen in der Zukunft",
    "NextGen Developer Experience",
  ];

  // Text-Animation cycling
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % welcomeTexts.length);
    }, 2000);

    // Show content after initial animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(contentTimer);
    };
  }, [isActive, welcomeTexts.length]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      {/* Main Welcome Container */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Animated Welcome Text */}
        <div className="mb-8 h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              {welcomeTexts[currentTextIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Personal Introduction */}
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl text-white font-light"
                >
                  {portfolioData.personal.name}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-cyan-300 font-medium"
                >
                  {portfolioData.personal.title}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                >
                  {portfolioData.personal.tagline}
                </motion.p>
              </div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              >
                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-cyan-400">
                    {portfolioData.personal.yearsOfExperience}+
                  </div>
                  <div className="text-sm text-gray-300">Jahre Erfahrung</div>
                </div>

                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">
                    {portfolioData.personal.projects}+
                  </div>
                  <div className="text-sm text-gray-300">Projekte</div>
                </div>

                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">
                    {portfolioData.personal.happyClients}+
                  </div>
                  <div className="text-sm text-gray-300">Zufriedene Kunden</div>
                </div>

                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-green-400">
                    {portfolioData.personal.technologies}+
                  </div>
                  <div className="text-sm text-gray-300">Technologien</div>
                </div>
              </motion.div>

              {/* Navigation Instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4 text-center"
              >
                <div className="text-sm text-gray-400">
                  Navigiere mit{" "}
                  <span className="text-cyan-300 font-mono">WASD</span> durch
                  das 3D-Portfolio
                </div>
                <div className="text-xs text-gray-500">
                  Springe mit{" "}
                  <span className="text-cyan-300 font-mono">SPACE</span> •
                  Bewege dich mit der{" "}
                  <span className="text-cyan-300 font-mono">Maus</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={onNext}
                  variant="primary"
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Portfolio erkunden
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 hover:border-cyan-400 hover:text-cyan-400"
                >
                  Direkt zu Projekten
                </Button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Animated Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: ((i * 5) % 100) + "%",
                y: ((i * 7) % 100) + "%",
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [((i * 7) % 100) + "%", ((i * 7 + 30) % 100) + "%"],
              }}
              transition={{
                duration: 15 + (i % 5),
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            />
          ))}

          {/* Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                 `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
