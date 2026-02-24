"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeTab, setActiveTab] = useState<
    "tech" | "workflow" | "roadmap" | "experiments" | "learnings" | "collab"
  >("tech");

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: 100 }}
      className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
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

        <div className="p-6 space-y-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "tech", label: "⚙️ Tech Stack" },
              { id: "workflow", label: "🛠️ Workflow" },
              { id: "roadmap", label: "🗺️ Roadmap" },
              { id: "experiments", label: "🧪 Experimente" },
              { id: "learnings", label: "📚 Learnings" },
              { id: "collab", label: "🤝 Kollab" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-white border border-cyan-300"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "tech" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="bg-cyan-500/10 border-cyan-400/30 p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-4xl">⚙️</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Stack & Architektur
                      </h2>
                      <p className="text-gray-300">
                        Next.js 16, React 19, TypeScript, R3F/Three für 3D,
                        TailwindCSS v4, Framer Motion für Motion, Nodemailer für
                        Kontakt-API. Deployment ziel: Vercel, Qualität: ESLint/Prettier.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "React 19", "R3F/Three", "TailwindCSS", "Framer Motion", "Nodemailer", "Vercel (ziel)", "ESLint/Prettier"].map(
                      (item) => (
                        <span
                          key={item}
                          className="px-3 py-1 text-sm rounded-full bg-cyan-400/15 text-cyan-100 border border-cyan-300/30"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "workflow" && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {[{
                  title: "Dev-Setup",
                  desc: "VS Code, Format-on-Save, ESLint, Tailwind IntelliSense, Git Hooks geplant (lint)",
                  icon: "🛠️",
                },
                {
                  title: "Branching",
                  desc: "Feature-Branches, PR-Reviews, kleine Commits; main bleibt deploy-fähig",
                  icon: "🌿",
                },
                {
                  title: "Testing",
                  desc: "Jest/RTL für Units geplant; Cypress e2e für Kern-Flows (Kontakt/CV) vorgesehen",
                  icon: "✅",
                },
                {
                  title: "Performance",
                  desc: "Lazy 3D, compress images, Lighthouse/Profiler Checks; R3F optimieren (useFrame sparsam)",
                  icon: "⚡",
                }].map((item) => (
                  <Card
                    key={item.title}
                    className="bg-white/5 border-white/10 p-5 flex gap-3"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-gray-300 text-sm mt-1">{item.desc}</div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === "roadmap" && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {[{
                  title: "PDF-Generator fürs CV",
                  status: "in Arbeit",
                  note: "Server-side PDF Build + Download-Button finalisieren",
                },
                {
                  title: "Backstage Demos",
                  status: "geplant",
                  note: "Shader/Animation-Playground mit Toggle",
                },
                {
                  title: "Testsuite",
                  status: "geplant",
                  note: "Jest/RTL + Cypress Smoke (Kontaktformular, CV-Link)",
                },
                {
                  title: "Performance Pass",
                  status: "bald",
                  note: "Images optimieren, R3F suspense, bundle split",
                }].map((item) => (
                  <Card key={item.title} className="bg-white/5 border-white/10 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-semibold">{item.title}</div>
                      <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm">{item.note}</div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === "experiments" && (
              <motion.div
                key="experiments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {["R3F Shader-Spielwiese", "Micro-Interactions mit Framer Motion", "Gradient-Themes & HUD-Polish", "Performance-Tests (Suspense/Lazy)"]
                  .map((title) => (
                    <Card key={title} className="bg-white/5 border-white/10 p-5">
                      <div className="text-white font-semibold mb-2">{title}</div>
                      <div className="text-gray-300 text-sm">
                        Work-in-progress Demos, die nach und nach hier landen.
                      </div>
                    </Card>
                  ))}
              </motion.div>
            )}

            {activeTab === "learnings" && (
              <motion.div
                key="learnings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="bg-white/5 border-white/10 p-6 space-y-3">
                  {["R3F sparsam: Weniger useFrame, mehr memoization", "Mailto/Provider-Links robust halten statt onClick Hacks", "UI-Performance: Bilder richtig zuschneiden/positionieren (Next Image)", "Kleine Commits & früh testen spart Zeit", "Klare Buckets für Skill-Level vermeiden Verwirrung"]
                    .map((item) => (
                      <div key={item} className="flex gap-2 text-gray-200 text-sm">
                        <span className="text-cyan-300">▸</span>
                        <span>{item}</span>
                      </div>
                    ))}
                </Card>
              </motion.div>
            )}

            {activeTab === "collab" && (
              <motion.div
                key="collab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="bg-cyan-500/10 border-cyan-400/30 p-8 text-center space-y-4">
                  <div className="text-4xl">🤝</div>
                  <h2 className="text-2xl font-bold text-white">Collab & Feedback</h2>
                  <p className="text-gray-200 max-w-2xl mx-auto">
                    Interesse an Zusammenarbeit, Reviews oder gemeinsamen Experimenten?
                    Lass uns sprechen – Contact-Station nutzen oder per LinkedIn/GitHub melden.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="primary"
                      onClick={onClose}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      Zur Contact-Station
                    </Button>
                    <a
                      href="https://www.linkedin.com/in/steffen-lorenz-8412873b2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button variant="outline">LinkedIn öffnen</Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
