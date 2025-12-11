"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStationManager } from "@/contexts/StationManager";

interface TestimonialsStationProps {
  isActive: boolean;
  onClose: () => void;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [];

export const TestimonialsStation: React.FC<TestimonialsStationProps> = ({
  isActive,
  onClose,
}) => {
  const { activateStation } = useStationManager();
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(
    null
  );

  if (!isActive) return null;

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      activateStation("contact" as any);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-orange-400/30 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-orange-400/20 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
            >
              ⭐ Testimonials
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
          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center py-16"
          >
            <Card className="bg-linear-to-br from-orange-500/10 via-yellow-500/10 to-orange-500/10 border-orange-400/30 p-12 max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-8xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl font-bold text-orange-400 mb-4">
                Meine ersten Kunden-Referenzen entstehen gerade!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Als frischgebackener Web-Entwickler sammle ich aktuell meine
                ersten professionellen Projekterfahrungen. Ihre Bewertung könnte
                hier die erste sein!
              </p>

              {/* Qualifikationen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-white/5 border border-orange-400/20 rounded-lg p-4">
                  <div className="text-orange-400 text-2xl mb-2">🎓</div>
                  <h3 className="text-white font-semibold mb-1">Ausbildung</h3>
                  <p className="text-sm text-gray-400">
                    DCI Berlin Web-Development (laufend)
                    <br />
                    BFW IT-Systemadministrator (2020-2021)
                  </p>
                </div>
                <div className="bg-white/5 border border-orange-400/20 rounded-lg p-4">
                  <div className="text-yellow-400 text-2xl mb-2">💼</div>
                  <h3 className="text-white font-semibold mb-1">
                    Praxiserfahrung
                  </h3>
                  <p className="text-sm text-gray-400">
                    Mercedes Benz (2022-2024)
                    <br />
                    Secosys-IT Praktikum (2021)
                  </p>
                </div>
                <div className="bg-white/5 border border-orange-400/20 rounded-lg p-4">
                  <div className="text-green-400 text-2xl mb-2">🚀</div>
                  <h3 className="text-white font-semibold mb-1">
                    Portfolio-Projekte
                  </h3>
                  <p className="text-sm text-gray-400">
                    6 abgeschlossene/laufende Projekte
                    <br />
                    Next.js, React, Three.js, Full Stack
                  </p>
                </div>
                <div className="bg-white/5 border border-orange-400/20 rounded-lg p-4">
                  <div className="text-blue-400 text-2xl mb-2">⚡</div>
                  <h3 className="text-white font-semibold mb-1">Tech Skills</h3>
                  <p className="text-sm text-gray-400">
                    HTML5, CSS3, JavaScript, Next.js
                    <br />
                    TailwindCSS, SQL, Python, Docker
                  </p>
                </div>
              </div>

              <div className="border-t border-orange-400/20 pt-6">
                <p className="text-lg text-orange-300 mb-4">
                  ✨ Seien Sie einer meiner ersten Kunden und profitieren Sie
                  von meinem Enthusiasmus, modernsten Technologien und fairen
                  Konditionen!
                </p>
                <div className="text-sm text-gray-400">
                  💪 Motiviert • 🎯 Zuverlässig • 🚀 Innovativ
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Hidden testimonials grid for future use */}
          <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className="bg-white/5 border-orange-400/20 hover:border-orange-400/50 p-6 h-full cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedTestimonial(testimonial.id)}
                >
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center text-3xl border-2 border-orange-400/30">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm italic mb-4 line-clamp-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Date */}
                  <div className="text-xs text-gray-500 text-right">
                    {testimonial.date}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Card className="bg-orange-500/10 border-orange-400/30 p-8">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">
                Arbeiten Sie mit mir zusammen!
              </h3>
              <p className="text-gray-300 mb-6">
                Lassen Sie uns gemeinsam Ihr nächstes Projekt zum Erfolg führen.
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Kontakt aufnehmen →
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-md border border-orange-400/30 rounded-xl p-8 max-w-2xl w-full"
            >
              {testimonials
                .filter((t) => t.id === selectedTestimonial)
                .map((testimonial) => (
                  <div key={testimonial.id}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center text-4xl border-2 border-orange-400/30">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-400">{testimonial.role}</p>
                        <p className="text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">
                          ⭐
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-200 text-lg italic mb-6">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="text-gray-500 text-right">
                      {testimonial.date}
                    </div>

                    <Button
                      onClick={() => setSelectedTestimonial(null)}
                      className="mt-6 w-full bg-orange-500 hover:bg-orange-600"
                    >
                      Schließen
                    </Button>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
