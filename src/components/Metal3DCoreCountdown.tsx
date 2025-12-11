"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Metal3DCoreCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = (): TimeLeft => {
      // Vorstellung am 14.02.2025
      const targetDate = new Date("2025-02-14T10:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  const timeUnits = [
    { label: "Tage", value: timeLeft.days },
    { label: "Stunden", value: timeLeft.hours },
    { label: "Minuten", value: timeLeft.minutes },
    { label: "Sekunden", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-linear-to-br from-red-950/30 via-black/50 to-purple-950/30 border-2 border-red-500/40 p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-6xl mb-4"
          >
            🎸
          </motion.div>
          <h2 className="text-4xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            Metal3DCore (M3DC)
          </h2>
          <p className="text-gray-300 text-lg italic">
            "The 3D Core of Metal Culture - Where Metal meets the third
            dimension."
          </p>
          <div className="mt-4 text-sm text-gray-400">
            <div>Projekt Start: 15.12.2024</div>
            <div className="text-red-400 font-semibold mt-1">
              Präsentation: 14.02.2025
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-red-950/50 border-2 border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl font-bold text-red-400 mb-2"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="border-t border-red-500/20 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-center text-gray-200 mb-4">
            🛠️ Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Next.js 15.5.7",
              "React 19.1.0",
              "TypeScript",
              "Tailwind v4",
              "Prisma",
              "PostgreSQL",
              "pgAdmin",
              "Docker",
              "React Three Fiber",
              "NextAuth.js",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-sm text-red-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="border-t border-red-500/20 pt-6 mt-6">
          <h3 className="text-xl font-semibold text-center text-gray-200 mb-4">
            🎯 Kern-Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-red-400">🌐</span>
              <span className="text-gray-300">
                7 Immersive 3D-Räume mit FPS-Navigation
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400">🎫</span>
              <span className="text-gray-300">
                Vollständiges Ticket-System (virtuell & physisch)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400">👥</span>
              <span className="text-gray-300">
                NextAuth.js mit Role-Based Access
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400">🎮</span>
              <span className="text-gray-300">
                Drag & Drop Interface mit WASD-Steuerung
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
