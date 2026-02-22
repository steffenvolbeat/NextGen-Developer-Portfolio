"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface LandingPageProps {
  onEnter: () => void;
  onStartSequence: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnter,
  onStartSequence,
}) => {
  const { theme } = useTheme();
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), #000000, rgba(17, 24, 39, 0.5))"
            : "linear-gradient(to bottom right, rgba(241, 245, 249, 1), #ffffff, rgba(241, 245, 249, 1))",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(ellipse at center, rgba(30, 58, 138, 0.1), transparent)"
              : "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15), transparent)",
        }}
      />
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
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor:
                theme === "dark"
                  ? "rgba(6, 182, 212, 0.2)"
                  : "rgba(8, 145, 178, 0.3)",
            }}
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
          <h1
            className="text-6xl md:text-8xl font-thin tracking-wider"
            style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}
          >
            NEXTGEN
          </h1>
          <div
            className="w-32 h-0.5 mx-auto"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(to right, transparent, #06b6d4, transparent)"
                  : "linear-gradient(to right, transparent, #0891b2, transparent)",
            }}
          />
          <div
            className="w-32 h-0.5 mx-auto"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(to right, transparent, #06b6d4, transparent)"
                  : "linear-gradient(to right, transparent, #0891b2, transparent)",
            }}
          />
          <p
            className="text-xl md:text-2xl font-light tracking-wide"
            style={{ color: theme === "dark" ? "#cbd5e1" : "#475569" }}
          >
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
                  boxShadow:
                    theme === "dark"
                      ? "0 0 30px rgba(6, 182, 212, 0.3)"
                      : "0 0 30px rgba(8, 145, 178, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-12 py-4 
                  bg-transparent 
                  text-lg font-light tracking-wider
                  rounded-sm
                  transition-all duration-300
                  backdrop-blur-sm
                  group
                "
                style={{
                  border:
                    theme === "dark"
                      ? "2px solid rgba(255, 255, 255, 0.2)"
                      : "2px solid rgba(15, 23, 42, 0.2)",
                  color: theme === "dark" ? "#ffffff" : "#0f172a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme === "dark"
                      ? "rgba(6, 182, 212, 0.5)"
                      : "rgba(8, 145, 178, 0.6)";
                  e.currentTarget.style.color =
                    theme === "dark" ? "#06b6d4" : "#0891b2";
                  e.currentTarget.style.backgroundColor =
                    theme === "dark"
                      ? "rgba(6, 182, 212, 0.05)"
                      : "rgba(8, 145, 178, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(15, 23, 42, 0.2)";
                  e.currentTarget.style.color =
                    theme === "dark" ? "#ffffff" : "#0f172a";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span className="flex items-center gap-3">
                  Enter
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: theme === "dark" ? "#06b6d4" : "#0891b2" }}
                  >
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
          <p
            className="text-xs tracking-wider"
            style={{ color: theme === "dark" ? "#6b7280" : "#9ca3af" }}
          >
            Experience the future of web development
          </p>
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            theme === "dark"
              ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
              : `linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </motion.div>
  );
};
