"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ResumeStationProps {
  isActive: boolean;
  onClose: () => void;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  grade?: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Produktionsmitarbeiter",
    company: "Mercedes Benz Center / Office People & Office Personal",
    location: "Kölleda, Erfurt, Deutschland",
    period: "09/2022 - 07/2024",
    description: [
      "Durchführen von Qualitätskontrollen",
      "Fachgerechtes Montieren von Bauteilen",
      "Sicherstellen der Produktqualität",
      "Arbeit im erstklassigen Motorenwerk mit Fokus auf Innovation",
    ],
    technologies: ["Qualitätskontrolle", "Montage", "Produktion"],
  },
  {
    id: 2,
    title: "Praktikant IT-Systemadministrator",
    company: "Secosys-IT",
    location: "Erfurt, Deutschland",
    period: "03/2021 - 06/2021",
    description: [
      "Konfiguration von Routern und Netzwerken (WAN, LAN, Routing, NAT)",
      "Domänen-Aufnahme von PCs",
      "Migration von Clientsystemen inkl. Datenübernahme",
      "Mitarbeit bei Kundenprojekten und Kundenkontakt vor Ort",
    ],
    technologies: ["Routing", "Netzwerk", "Windows Server", "Migration"],
  },
  {
    id: 3,
    title: "Zimmermann",
    company: "Yelloshark, Das Team",
    location: "Österreich / Schweiz",
    period: "05/2009 - 06/2018",
    description: [
      "Ausländische temporäre Einsätze (Salzburg, Innsbruck, Wien, Luzern, Zürich, Bern, Basel, Interlaken)",
      "Ausführen von Zimmer- und Holzbauarbeiten",
      "Durchführen von Ausbau- und Dämmarbeiten",
      "Qualitätskontrollen und fachgerechtes Montieren von Bauteilen",
    ],
    technologies: ["Holzbau", "Dämmung", "Ausbau", "Montage"],
  },
];

const education: Education[] = [
  {
    id: 1,
    degree: "Weiterbildungsprogramm Web-Development / Fullstack",
    institution: "DCI - Digital Career Institute",
    location: "Berlin, Deutschland",
    period: "02/2025 - 04/2026",
    description:
      "Intensives Fullstack-Entwicklungsprogramm mit Fokus auf moderne Web-Technologien",
  },
  {
    id: 2,
    degree: "Umschulung IT-Systemadministrator",
    institution: "BFW Thüringen",
    location: "Seellingstädt, Deutschland",
    period: "03/2020 - 06/2021",
    description:
      "Umfassende Ausbildung in IT-Systemadministration und Netzwerktechnik",
  },
  {
    id: 3,
    degree: "Ausbildung Zimmermannsgeselle",
    institution: "Berufsschule Saalfeld",
    location: "Saalfeld, Deutschland",
    period: "08/1992 - 08/1995",
    description: "Abgeschlossene Ausbildung zum Zimmermannsgesellen",
  },
];

const certifications: Certification[] = [
  {
    id: 1,
    name: "PC-Service Zertifikat",
    issuer: "BFW Thüringen",
    date: "02/2020 - 06/2021",
  },
];

const skills = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "Next.js", "TailwindCSS", "Figma"],
  Backend: ["SQL", "Python", "Prisma", "PostgreSQL"],
  DevOps: ["Docker", "Git", "GitHub"],
  "Soft Skills": [
    "Teamfähigkeit",
    "Kreativität",
    "Analytisches Denken",
    "Motivation",
    "Selbstständigkeit",
  ],
};

export const ResumeStation: React.FC<ResumeStationProps> = ({
  isActive,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "skills" | "certifications"
  >("experience");

  if (!isActive) return null;

  const handleDownloadCV = () => {
    // Hier würde der PDF-Download implementiert werden
    alert("📥 CV-Download wird vorbereitet... (PDF-Generierung kommt bald!)");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-blue-400/30 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-blue-400/20 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"
            >
              📄 Lebenslauf & CV
            </motion.h1>
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadCV}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                📥 CV herunterladen (PDF)
              </Button>
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

          {/* Tabs */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { id: "experience", label: "💼 Berufserfahrung", icon: "💼" },
              { id: "education", label: "🎓 Ausbildung", icon: "🎓" },
              { id: "skills", label: "⚡ Skills", icon: "⚡" },
              { id: "certifications", label: "🏆 Zertifikate", icon: "🏆" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white border-2 border-blue-400"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/30 p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center text-5xl border-4 border-blue-400/30">
                  👨‍💻
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Steffen Lorenz
                  </h2>
                  <p className="text-xl text-blue-300 mb-4">
                    Web-Entwickler / Fullstack
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    Als angehender engagierter Web-Entwickler mit Fokus auf
                    strukturierte, semantische und performante Weblösungen.
                    Meine Schwerpunkte liegen in HTML5, CSS3, JavaScript,
                    Next.js und SQL. Durch meine IT-Umschulung und vielseitige
                    Praxiserfahrung arbeite ich analytisch, zuverlässig und
                    lösungsorientiert.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>📍</span>
                      <span>Erfurt, Deutschland</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>✉️</span>
                      <span>steffen.konstanz@gmx.ch</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>📱</span>
                      <span>+49 173 4235651</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-400/30" />

                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="relative pl-20 pb-8"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-blue-900" />

                    <Card className="bg-white/5 border-blue-400/20 hover:border-blue-400/50 p-6 transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-blue-300 mb-1">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-400">
                            {exp.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30">
                            {exp.period}
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="text-gray-200 flex items-start gap-2"
                          >
                            <span className="text-blue-400 mt-1">▸</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm border border-blue-400/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="bg-white/5 border-blue-400/20 hover:border-blue-400/50 p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center text-3xl border-2 border-blue-400/30">
                        🎓
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-blue-300 mb-1">
                              {edu.institution}
                            </p>
                            <p className="text-sm text-gray-400">
                              {edu.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30 mb-2">
                              {edu.period}
                            </div>
                            {edu.grade && (
                              <div className="text-sm text-gray-300">
                                Note:{" "}
                                <span className="font-bold text-blue-400">
                                  {edu.grade}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-200">{edu.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="bg-white/5 border-blue-400/20 p-6 h-full">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">
                        {category === "Frontend" && "🎨"}
                        {category === "Backend" && "⚙️"}
                        {category === "DevOps" && "🚀"}
                        {category === "Tools" && "🛠️"}
                      </span>
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="bg-white/5 border-blue-400/20 hover:border-blue-400/50 p-6 h-full transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-3xl border-2 border-blue-400/30 mb-4">
                        🏆
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-blue-300 mb-2">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">{cert.date}</p>
                      {cert.credential && (
                        <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded">
                          {cert.credential}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-linear-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Vollständigen Lebenslauf herunterladen
              </h3>
              <p className="text-gray-200 mb-6">
                Laden Sie meinen kompletten CV als PDF herunter für detaillierte
                Informationen.
              </p>
              <Button
                onClick={handleDownloadCV}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3"
              >
                📥 CV als PDF herunterladen
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
