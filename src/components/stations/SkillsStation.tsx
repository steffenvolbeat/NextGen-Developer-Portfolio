"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portfolioData } from "@/data/portfolio";
import { cn, formatSkillLevel } from "@/lib/utils";

interface SkillsStationProps {
  isActive: boolean;
  onClose: () => void;
}

export const SkillsStation: React.FC<SkillsStationProps> = ({
  isActive,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    portfolioData.skills[0]?.id || ""
  );
  const [animateSkills, setAnimateSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setAnimateSkills(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  const selectedSkillCategory = portfolioData.skills.find(
    (category) => category.id === selectedCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-white/10 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              Technische Skills
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
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Kategorien
            </h2>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-medium",
                    selectedCategory === category.id
                      ? "bg-linear-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                  )}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            {selectedSkillCategory && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-white">
                  {selectedSkillCategory.category}
                </h3>

                <div className="grid gap-6">
                  {selectedSkillCategory.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <Card
                        variant="glass"
                        className={cn(
                          "p-6 transition-all duration-300",
                          hoveredSkill === skill.name &&
                            "border-green-400/50 bg-green-400/5"
                        )}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-white mb-2">
                              {skill.name}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <span>📈 {formatSkillLevel(skill.level)}</span>
                              <span>⏱️ {skill.yearsExperience} Jahre</span>
                            </div>
                          </div>

                          {/* Skill Level Badge */}
                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-sm font-medium",
                              skill.level >= 90
                                ? "bg-green-500/20 text-green-400 border border-green-400/30"
                                : skill.level >= 80
                                ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                                : skill.level >= 70
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                                : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                            )}
                          >
                            {skill.level >= 90
                              ? "Expert"
                              : skill.level >= 80
                              ? "Sehr gut"
                              : skill.level >= 70
                              ? "Gut"
                              : "Grundlagen"}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Kenntnisstand</span>
                            <span className="text-white font-medium">
                              {formatSkillLevel(skill.level)}
                            </span>
                          </div>

                          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: animateSkills ? `${skill.level}%` : 0,
                              }}
                              transition={{
                                duration: 1.5,
                                delay: index * 0.1,
                                ease: "easeOut",
                              }}
                              className={cn(
                                "h-full rounded-full relative",
                                skill.level >= 90
                                  ? "bg-linear-to-r from-green-400 to-emerald-500"
                                  : skill.level >= 80
                                  ? "bg-linear-to-r from-blue-400 to-cyan-500"
                                  : skill.level >= 70
                                  ? "bg-linear-to-r from-yellow-400 to-orange-500"
                                  : "bg-linear-to-r from-gray-400 to-gray-500"
                              )}
                            >
                              {/* Glow Effect */}
                              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span>
                              {skill.yearsExperience === 1
                                ? "1 Jahr"
                                : `${skill.yearsExperience} Jahre`}{" "}
                              Praxiserfahrung
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Skills Übersicht
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {portfolioData.skills.reduce(
                      (total, category) =>
                        total +
                        category.items.filter((skill) => skill.level >= 90)
                          .length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-300">Expert Level</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {portfolioData.skills.reduce(
                      (total, category) =>
                        total +
                        category.items.filter(
                          (skill) => skill.level >= 80 && skill.level < 90
                        ).length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-300">Sehr gut</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {portfolioData.skills.reduce(
                      (total, category) => total + category.items.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-300">Gesamt Skills</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {Math.round(
                      portfolioData.skills.reduce(
                        (total, category) =>
                          total +
                          category.items.reduce(
                            (sum, skill) => sum + (skill.yearsExperience || 0),
                            0
                          ),
                        0
                      ) /
                        portfolioData.skills.reduce(
                          (total, category) => total + category.items.length,
                          0
                        )
                    )}
                  </div>
                  <div className="text-sm text-gray-300">Ø Jahre Erfahrung</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Learning Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                🎯 Meine Lernphilosophie
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Technologie entwickelt sich rasant weiter. Deshalb ist
                  kontinuierliches Lernen für mich nicht nur ein Hobby, sondern
                  eine Kernkompetenz.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-medium text-white">
                      Ständige Weiterbildung
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Neue Frameworks und Best Practices
                    </div>
                  </div>

                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-2">🛠️</div>
                    <div className="font-medium text-white">
                      Hands-on Erfahrung
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Learning by doing in echten Projekten
                    </div>
                  </div>

                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-2">🤝</div>
                    <div className="font-medium text-white">Wissensteilung</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Mentoring und Community-Beiträge
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-green-900/10 via-blue-900/10 to-teal-900/10" />

          {/* Code Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 font-mono text-xs text-green-400 whitespace-pre leading-4 overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {`const skill${i} = { level: ${Math.floor(
                    Math.random() * 100
                  )}, experience: '${Math.floor(Math.random() * 5) + 1}y' };\n`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
