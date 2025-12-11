"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portfolioData } from "@/data/portfolio";
import { formatDateMonthYear, calculateDuration, cn } from "@/lib/utils";

interface ExperienceStationProps {
  isActive: boolean;
  onClose: () => void;
}

export const ExperienceStation: React.FC<ExperienceStationProps> = ({
  isActive,
  onClose,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"timeline" | "detailed">("timeline");

  if (!isActive) return null;

  const experiences = portfolioData.experience.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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
              className="text-3xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              Berufserfahrung
            </motion.h1>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("timeline")}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-all",
                    viewMode === "timeline"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode("detailed")}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-all",
                    viewMode === "detailed"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  Details
                </button>
              </div>

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
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {viewMode === "timeline" ? (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Career Summary */}
                <Card variant="glass" className="p-6 mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Karriere-Übersicht
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {experiences.length}
                      </div>
                      <div className="text-sm text-gray-300">Stationen</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {portfolioData.personal.yearsOfExperience}+
                      </div>
                      <div className="text-sm text-gray-300">
                        Jahre Erfahrung
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {
                          [
                            ...new Set(
                              experiences.flatMap((exp) => exp.technologies)
                            ),
                          ].length
                        }
                      </div>
                      <div className="text-sm text-gray-300">Technologien</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">
                        {experiences.reduce(
                          (total, exp) =>
                            total + (exp.achievements?.length || 0),
                          0
                        )}
                      </div>
                      <div className="text-sm text-gray-300">Erfolge</div>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-400 via-blue-400 to-green-400" />

                  <div className="space-y-12">
                    {experiences.map((experience, index) => (
                      <motion.div
                        key={experience.id}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-20"
                      >
                        {/* Timeline Dot */}
                        <div
                          className={cn(
                            "absolute left-6 w-4 h-4 rounded-full border-4 border-white bg-linear-to-r",
                            experience.current
                              ? "from-green-400 to-emerald-500 animate-pulse shadow-lg shadow-green-400/50"
                              : "from-purple-400 to-blue-500"
                          )}
                        >
                          {experience.current && (
                            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                          )}
                        </div>

                        <Card
                          variant="glass"
                          className={cn(
                            "p-6 cursor-pointer transition-all duration-300 hover:border-purple-400/50",
                            selectedExperience === experience.id &&
                              "border-purple-400 bg-purple-400/10"
                          )}
                          onClick={() =>
                            setSelectedExperience(
                              selectedExperience === experience.id
                                ? null
                                : experience.id
                            )
                          }
                        >
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white mb-1">
                                {experience.position}
                              </h3>
                              <div className="text-purple-300 font-medium mb-2">
                                {experience.company}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-300">
                                <span>📍 {experience.location}</span>
                                <span>
                                  ⏱️{" "}
                                  {calculateDuration(
                                    experience.startDate,
                                    experience.endDate || undefined
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-300 mb-1">
                                {formatDateMonthYear(experience.startDate)} -{" "}
                                {experience.endDate
                                  ? formatDateMonthYear(experience.endDate)
                                  : "Heute"}
                              </div>
                              {experience.current && (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                  Aktuell
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {experience.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {experience.technologies
                              ?.slice(0, 6)
                              .map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            {(experience.technologies?.length || 0) > 6 && (
                              <span className="px-3 py-1 text-gray-400 text-sm">
                                +{(experience.technologies?.length || 0) - 6}{" "}
                                weitere
                              </span>
                            )}
                          </div>

                          {/* Expandable Details */}
                          <AnimatePresence>
                            {selectedExperience === experience.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-white/10 pt-4 mt-4 space-y-4"
                              >
                                {/* Responsibilities */}
                                <div>
                                  <h4 className="text-white font-medium mb-2">
                                    Aufgabenbereiche:
                                  </h4>
                                  <ul className="space-y-1">
                                    {experience.responsibilities.map(
                                      (responsibility, respIndex) => (
                                        <li
                                          key={respIndex}
                                          className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                          <span className="text-purple-400 mt-1">
                                            •
                                          </span>
                                          <span>{responsibility}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                {/* Achievements */}
                                <div>
                                  <h4 className="text-white font-medium mb-2">
                                    Wichtige Erfolge:
                                  </h4>
                                  <ul className="space-y-1">
                                    {experience.achievements?.map(
                                      (achievement, achIndex) => (
                                        <li
                                          key={achIndex}
                                          className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                          <span className="text-green-400 mt-1">
                                            ✓
                                          </span>
                                          <span>{achievement}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                {/* All Technologies */}
                                <div>
                                  <h4 className="text-white font-medium mb-2">
                                    Verwendete Technologien:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies?.map(
                                      (tech, techIndex) => (
                                        <span
                                          key={techIndex}
                                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                                        >
                                          {tech}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="detailed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6"
              >
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="glass" className="p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-2xl font-bold text-white">
                                {experience.position}
                              </h3>
                              {experience.current && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                  Aktuelle Position
                                </div>
                              )}
                            </div>
                            <div className="text-purple-300 font-medium text-lg mb-2">
                              {experience.company}
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                              <span>📍 {experience.location}</span>
                              <span>
                                📅 {formatDateMonthYear(experience.startDate)} -{" "}
                                {experience.endDate
                                  ? formatDateMonthYear(experience.endDate)
                                  : "Heute"}
                              </span>
                              <span>
                                ⏱️{" "}
                                {calculateDuration(
                                  experience.startDate,
                                  experience.endDate || undefined
                                )}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-300 leading-relaxed">
                            {experience.description}
                          </p>

                          <div>
                            <h4 className="text-white font-medium mb-2">
                              Aufgabenbereiche:
                            </h4>
                            <ul className="space-y-1">
                              {experience.responsibilities.map(
                                (responsibility, respIndex) => (
                                  <li
                                    key={respIndex}
                                    className="text-gray-300 flex items-start gap-2"
                                  >
                                    <span className="text-purple-400 mt-1 text-sm">
                                      ▶
                                    </span>
                                    <span>{responsibility}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-white font-medium mb-2">
                              Wichtige Erfolge:
                            </h4>
                            <ul className="space-y-1">
                              {experience.achievements?.map(
                                (achievement, achIndex) => (
                                  <li
                                    key={achIndex}
                                    className="text-gray-300 flex items-start gap-2"
                                  >
                                    <span className="text-green-400 mt-1">
                                      ✓
                                    </span>
                                    <span>{achievement}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Side Info */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-white font-medium mb-3">
                              Technologien
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies?.map(
                                (tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/10 via-blue-900/10 to-indigo-900/10" />

          {/* Timeline Elements */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
                className="absolute w-16 h-16 border border-purple-400/30 rounded-full"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${10 + i * 7}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
