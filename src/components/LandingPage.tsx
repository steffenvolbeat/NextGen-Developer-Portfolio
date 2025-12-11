"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingPageProps {
  onEnter: () => void;
  onStartSequence: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnter,
  onStartSequence,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after initial load
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900/50 via-black to-gray-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: ((i * 7.23) % 100) + "%",
              y: ((i * 11.37) % 100) + "%",
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + ((i * 0.1) % 3),
              repeat: Infinity,
              delay: (i * 0.05) % 2,
            }}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12">
        {/* Logo or Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-8xl font-thin text-white tracking-wider">
            NEXTGEN
          </h1>
          <div className="w-32 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
          <div className="w-32 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            Developer Portfolio
          </p>
        </motion.div>

        {/* Enter Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <motion.button
                onClick={onStartSequence}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-12 py-4 
                  bg-transparent 
                  border-2 border-white/20 
                  text-white text-lg font-light tracking-wider
                  rounded-sm
                  hover:border-cyan-400/50 
                  hover:text-cyan-400
                  hover:bg-cyan-400/5
                  transition-all duration-300
                  backdrop-blur-sm
                  group
                "
              >
                <span className="flex items-center gap-3">
                  Enter
                  <motion.span className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-gray-500 text-xs tracking-wider">
            Experience the future of web development
          </p>
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </motion.div>
  );
};
