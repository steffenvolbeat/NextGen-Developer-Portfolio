"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { portfolioData } from "@/data/portfolio";
import { cn, formatDateMonthYear, isValidUrl } from "@/lib/utils";

interface ProjectsStationProps {
  isActive: boolean;
  onClose: () => void;
}

export const ProjectsStation: React.FC<ProjectsStationProps> = ({
  isActive,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return portfolioData.projects;
    return portfolioData.projects.filter((project) =>
      project.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [
      "all",
      ...new Set(portfolioData.projects.map((project) => project.category)),
    ];
    return cats;
  }, []);

  const selectedProjectData = portfolioData.projects.find(
    (p) => p.id === selectedProject
  );

  if (!isActive) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      >
        <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-white/10 p-6">
            <div className="flex justify-between items-center">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Meine Projekte
              </motion.h1>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "px-4 py-2 rounded text-sm font-medium transition-all",
                      viewMode === "grid"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    🔲 Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "px-4 py-2 rounded text-sm font-medium transition-all",
                      viewMode === "list"
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    📝 Liste
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

          <div className="p-6 space-y-8">
            {/* Stats & Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass" className="p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Portfolio-Übersicht
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {portfolioData.projects.length}
                    </div>
                    <div className="text-sm text-gray-300">Projekte</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {portfolioData.projects.filter((p) => p.featured).length}
                    </div>
                    <div className="text-sm text-gray-300">Featured</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {
                        portfolioData.projects.filter(
                          (p) => p.status === "completed"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-300">Abgeschlossen</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {
                        portfolioData.projects.filter(
                          (p) => p.status === "in-development"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-300">In Entwicklung</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {
                        [
                          ...new Set(
                            portfolioData.projects.flatMap(
                              (p) => p.technologies
                            )
                          ),
                        ].length
                      }
                    </div>
                    <div className="text-sm text-gray-300">Technologien</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Kategorien
              </h2>
              <div className="flex flex-wrap gap-3 mb-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => setSelectedCategory(category || "")}
                    className={cn(
                      "px-6 py-3 rounded-lg transition-all duration-300 font-medium capitalize",
                      selectedCategory === category
                        ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                    )}
                  >
                    {category === "all" ? "Alle Projekte" : category}
                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category === "all"
                        ? portfolioData.projects.length
                        : portfolioData.projects.filter(
                            (p) =>
                              p.category &&
                              p.category
                                .toLowerCase()
                                .includes(category?.toLowerCase() || "")
                          ).length}
                    </span>
                  </motion.button>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {filteredProjects.length} Projekt
                {filteredProjects.length !== 1 ? "e" : ""} gefunden
              </div>
            </motion.div>

            {/* Projects Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${selectedCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <Card
                          variant="glass"
                          className="p-0 overflow-hidden hover:border-orange-400/50 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]"
                          onClick={() => setSelectedProject(project.id)}
                        >
                          {/* Project Image/Preview */}
                          <div className="relative h-48 bg-linear-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for project image */}
                            <div className="text-6xl opacity-50">
                              {project.category === "Web Development"
                                ? "🌐"
                                : project.category === "Full Stack"
                                ? "⚡"
                                : project.category === "AI/ML"
                                ? "🤖"
                                : "💻"}
                            </div>

                            {/* Status Badge */}
                            <div
                              className={cn(
                                "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
                                project.status === "completed"
                                  ? "bg-green-500/20 text-green-400 border border-green-400/30"
                                  : project.status === "in-development"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                                  : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                              )}
                            >
                              {project.status === "completed"
                                ? "✅ Fertig"
                                : project.status === "in-development"
                                ? "🚧 In Arbeit"
                                : "📝 Geplant"}
                            </div>

                            {/* Featured Badge */}
                            {project.featured && (
                              <div className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-medium">
                                ⭐ Featured
                              </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="primary" size="sm">
                                Details ansehen
                              </Button>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                              {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies
                                .slice(0, 3)
                                .map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs border border-white/20"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {project.technologies.length > 3 && (
                                <span className="px-2 py-1 text-gray-400 text-xs">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Quick Links */}
                            <div className="flex gap-2">
                              {project.links?.live && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                >
                                  🌐 Live
                                </Button>
                              )}
                              {project.links?.github && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                >
                                  💻 Code
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          variant="glass"
                          className="p-6 hover:border-orange-400/50 transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedProject(project.id)}
                        >
                          <div className="grid lg:grid-cols-4 gap-6 items-start">
                            {/* Project Info */}
                            <div className="lg:col-span-3 space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-2xl font-bold text-white mb-2">
                                    {project.title}
                                  </h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                                    <span>🏷️ {project.category}</span>
                                    <span>
                                      📅{" "}
                                      {formatDateMonthYear(project.startDate)}
                                    </span>
                                    {project.featured && (
                                      <span>⭐ Featured</span>
                                    )}
                                  </div>
                                </div>

                                <div
                                  className={cn(
                                    "px-3 py-1 rounded-full text-sm font-medium",
                                    project.status === "completed"
                                      ? "bg-green-500/20 text-green-400 border border-green-400/30"
                                      : project.status === "in-development"
                                      ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                                      : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                                  )}
                                >
                                  {project.status === "completed"
                                    ? "✅ Abgeschlossen"
                                    : project.status === "in-development"
                                    ? "🚧 In Entwicklung"
                                    : "📝 Geplant"}
                                </div>
                              </div>

                              <p className="text-gray-300 leading-relaxed">
                                {project.description}
                              </p>

                              <div>
                                <h4 className="text-white font-medium mb-2">
                                  Highlights:
                                </h4>
                                <ul className="space-y-1">
                                  {project.highlights
                                    ?.slice(0, 3)
                                    .map((highlight, hIndex) => (
                                      <li
                                        key={hIndex}
                                        className="text-gray-300 text-sm flex items-start gap-2"
                                      >
                                        <span className="text-orange-400 mt-1">
                                          ▶
                                        </span>
                                        <span>{highlight}</span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-400/30"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                              <Button
                                variant="primary"
                                size="sm"
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project.id);
                                }}
                              >
                                Details ansehen
                              </Button>

                              {project.links?.live && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  🌐 Live Demo
                                </Button>
                              )}

                              {project.links?.github && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  💻 Code ansehen
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Keine Projekte gefunden
                </h3>
                <p className="text-gray-400">
                  Versuchen Sie eine andere Kategorie oder zeigen Sie alle
                  Projekte an.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("all")}
                  className="mt-4"
                >
                  Alle Projekte anzeigen
                </Button>
              </motion.div>
            )}
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-orange-900/10 via-red-900/10 to-yellow-900/10" />
          </div>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      {selectedProjectData && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProjectData.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProjectData.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span>🏷️ {selectedProjectData.category}</span>
                    <span>
                      📅 {formatDateMonthYear(selectedProjectData.startDate)}
                    </span>
                    {selectedProjectData.endDate && (
                      <span>
                        🏁 {formatDateMonthYear(selectedProjectData.endDate)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProjectData.featured && (
                    <div className="bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full text-sm">
                      ⭐ Featured
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      selectedProjectData.status === "completed"
                        ? "bg-green-500/20 text-green-400 border border-green-400/30"
                        : selectedProjectData.status === "in-development"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                    )}
                  >
                    {selectedProjectData.status === "completed"
                      ? "✅ Abgeschlossen"
                      : selectedProjectData.status === "in-development"
                      ? "🚧 In Entwicklung"
                      : "📝 Geplant"}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {selectedProjectData.description}
              </p>
            </div>

            {/* Detailed Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Projektbeschreibung
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-3">
                {selectedProjectData.longDescription
                  ?.split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {selectedProjectData.highlights?.map((highlight, index) => (
                  <li
                    key={index}
                    className="text-gray-300 flex items-start gap-3"
                  >
                    <span className="text-orange-400 mt-1">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Verwendete Technologien
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedProjectData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-400/30 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              {selectedProjectData.links?.live &&
                isValidUrl(selectedProjectData.links.live) && (
                  <Button variant="primary" size="lg">
                    🌐 Live Demo ansehen
                  </Button>
                )}

              {selectedProjectData.links?.github &&
                isValidUrl(selectedProjectData.links.github) && (
                  <Button variant="outline" size="lg">
                    💻 Code auf GitHub
                  </Button>
                )}

              {selectedProjectData.links?.demo &&
                isValidUrl(selectedProjectData.links.demo) && (
                  <Button variant="outline" size="lg">
                    🎥 Demo Video
                  </Button>
                )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
