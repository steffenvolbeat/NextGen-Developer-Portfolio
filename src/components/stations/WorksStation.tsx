"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portfolioData } from "@/data/portfolio";
import { Metal3DCoreCountdown } from "@/components/Metal3DCoreCountdown";

interface WorksStationProps {
  isActive: boolean;
  onClose: () => void;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  year: string;
  status: "completed" | "in-progress" | "planning" | "planned";
}

// Konvertiere portfolio.ts projects zu WorksStation format
const projects: Project[] = portfolioData.projects.map((project, index) => {
  const projectIcons = ["🎨", "📱", "📋", "🎵", "🎸", "🤖"];
  const yearFromDate = project.startDate
    ? new Date(project.startDate).getFullYear().toString()
    : "2024";

  return {
    id: index + 1,
    title: project.title,
    description: project.description,
    category: project.category || "Web Development",
    tags: project.technologies.slice(0, 4),
    image: projectIcons[index] || "💻",
    demoUrl: project.demoUrl,
    githubUrl: project.links?.github,
    technologies: project.technologies,
    year: yearFromDate,
    status: (project.status || "completed") as
      | "completed"
      | "in-progress"
      | "planning"
      | "planned",
  };
});

export const WorksStation: React.FC<WorksStationProps> = ({
  isActive,
  onClose,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!isActive) return null;

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 border-green-400/30 bg-green-500/10";
      case "in-progress":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-500/10";
      case "planning":
      case "planned":
        return "text-blue-400 border-blue-400/30 bg-blue-500/10";
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "✅ Abgeschlossen";
      case "in-progress":
        return "🔄 In Arbeit";
      case "planning":
      case "planned":
        return "📝 Geplant";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-purple-400/20 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              🎨 Portfolio & Projekte
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
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <Card className="bg-purple-500/10 border-purple-400/30 p-6 text-center">
              <div className="text-4xl font-bold text-purple-400">
                {projects.length}
              </div>
              <div className="text-gray-300 mt-2">Total Projects</div>
            </Card>
            <Card className="bg-green-500/10 border-green-400/30 p-6 text-center">
              <div className="text-4xl font-bold text-green-400">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-gray-300 mt-2">Completed</div>
            </Card>
            <Card className="bg-yellow-500/10 border-yellow-400/30 p-6 text-center">
              <div className="text-4xl font-bold text-yellow-400">
                {projects.filter((p) => p.status === "in-progress").length}
              </div>
              <div className="text-gray-300 mt-2">In Progress</div>
            </Card>
            <Card className="bg-blue-500/10 border-blue-400/30 p-6 text-center">
              <div className="text-4xl font-bold text-blue-400">
                {new Set(projects.flatMap((p) => p.technologies)).size}
              </div>
              <div className="text-gray-300 mt-2">Technologies</div>
            </Card>
          </motion.div>

          {/* Metal3DCore Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="my-8"
          >
            <Metal3DCoreCountdown />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className="bg-white/5 border-purple-400/20 hover:border-purple-400/50 p-6 h-full cursor-pointer transition-all duration-300 hover:scale-105 group"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center text-4xl border-2 border-purple-400/30 group-hover:scale-110 transition-transform">
                      {project.image}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusText(project.status)}
                    </div>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.category}
                  </p>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 mt-auto">
                    {project.demoUrl && (
                      <div className="flex-1 text-center py-2 bg-purple-500/20 text-purple-300 rounded text-xs">
                        🔗 Demo
                      </div>
                    )}
                    {project.githubUrl && (
                      <div className="flex-1 text-center py-2 bg-white/10 text-gray-300 rounded text-xs">
                        💻 GitHub
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-purple-500/20 flex items-center justify-center text-5xl border-2 border-purple-400/30">
                    {selectedProject.image}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-purple-300">
                      {selectedProject.category} • {selectedProject.year}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(
                    selectedProject.status
                  )}`}
                >
                  {getStatusText(selectedProject.status)}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Beschreibung
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Technologien
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {selectedProject.demoUrl && (
                  <Button
                    onClick={() =>
                      window.open(selectedProject.demoUrl, "_blank")
                    }
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    🔗 Live Demo ansehen
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    onClick={() =>
                      window.open(selectedProject.githubUrl, "_blank")
                    }
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                  >
                    💻 GitHub Repository
                  </Button>
                )}
              </div>

              <Button
                onClick={() => setSelectedProject(null)}
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600"
              >
                Schließen
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
