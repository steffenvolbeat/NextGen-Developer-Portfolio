"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { portfolioData } from "@/data/portfolio";
import { validateEmail, validatePhone, cn } from "@/lib/utils";

interface ContactStationProps {
  isActive: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
}

export const ContactStation: React.FC<ContactStationProps> = ({
  isActive,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"contact" | "form" | "cv">(
    "contact"
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const { contact, cv, personal } = portfolioData;

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name ist erforderlich";
    }

    if (!formData.email.trim()) {
      errors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Ungültige E-Mail-Adresse";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Betreff ist erforderlich";
    }

    if (!formData.message.trim()) {
      errors.message = "Nachricht ist erforderlich";
    } else if (formData.message.length < 10) {
      errors.message = "Nachricht muss mindestens 10 Zeichen lang sein";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Ungültige Telefonnummer";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-white/10 p-6">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
            >
              Kontakt & CV
            </motion.h1>

            <div className="flex items-center gap-4">
              {/* Tab Navigation */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("contact")}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-all",
                    activeTab === "contact"
                      ? "bg-teal-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  📞 Kontakt
                </button>
                <button
                  onClick={() => setActiveTab("form")}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-all",
                    activeTab === "form"
                      ? "bg-teal-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  ✉️ Nachricht
                </button>
                <button
                  onClick={() => setActiveTab("cv")}
                  className={cn(
                    "px-4 py-2 rounded text-sm font-medium transition-all",
                    activeTab === "cv"
                      ? "bg-teal-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  )}
                >
                  📄 CV
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
            {/* Contact Tab */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Availability Status */}
                <Card variant="glass" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                      Verfügbarkeit
                    </h2>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-400/30">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="font-medium">
                        {contact.availability}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        Ich freue mich darauf, von Ihnen zu hören! Ob Sie eine
                        Frage haben, ein Projekt besprechen möchten oder einfach
                        nur Hallo sagen wollen.
                      </p>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div>⏱️ {contact.responseTime}</div>
                        <div>🌍 Zeitzone: {contact.timezone}</div>
                        <div>
                          🗣️ Sprachen:{" "}
                          {contact.languages?.join(", ") || "Nicht angegeben"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-white font-medium">
                        Beste Kontaktzeiten:
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>Montag - Freitag</span>
                          <span>9:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Samstag</span>
                          <span>10:00 - 16:00</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Sonntag</span>
                          <span>Nur Notfälle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contact.methods?.map((method, index) => (
                    <motion.div
                      key={method.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        variant="glass"
                        className={cn(
                          "p-6 text-center hover:border-teal-400/50 transition-all duration-300 cursor-pointer group",
                          method.primary && "border-teal-400/30 bg-teal-400/5"
                        )}
                      >
                        <div className="text-4xl mb-4">{method.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {method.label}
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm break-all">
                          {method.value}
                        </p>

                        <Button
                          variant={method.primary ? "primary" : "outline"}
                          size="sm"
                          className="w-full group-hover:scale-105 transition-transform"
                        >
                          {method.type === "email"
                            ? "E-Mail senden"
                            : method.type === "phone"
                            ? "Anrufen"
                            : method.type === "linkedin"
                            ? "LinkedIn öffnen"
                            : method.type === "github"
                            ? "GitHub besuchen"
                            : "Öffnen"}
                        </Button>

                        {method.primary && (
                          <div className="mt-2 text-xs text-teal-300">
                            Bevorzugter Kontaktweg
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Social Proof */}
                <Card variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Was Kunden sagen
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                      <div className="text-sm text-gray-300">
                        "Hervorragende Arbeit und sehr professionell!"
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        - Maria S.
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl mb-2">🚀</div>
                      <div className="text-sm text-gray-300">
                        "Projekt wurde pünktlich und im Budget geliefert."
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        - Thomas K.
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl mb-2">💡</div>
                      <div className="text-sm text-gray-300">
                        "Innovative Lösungen und tolle Kommunikation!"
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        - Lisa M.
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Contact Form Tab */}
            {activeTab === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <Card variant="glass" className="p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Schreiben Sie mir eine Nachricht
                  </h2>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30"
                    >
                      ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                      Ich melde mich innerhalb von 24 Stunden bei Ihnen.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30"
                    >
                      ❌ Entschuldigung, beim Senden der Nachricht ist ein
                      Fehler aufgetreten. Bitte versuchen Sie es erneut oder
                      kontaktieren Sie mich direkt.
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-white font-medium mb-2"
                        >
                          Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={cn(
                            "w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400",
                            "focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors",
                            formErrors.name
                              ? "border-red-400"
                              : "border-white/30"
                          )}
                          placeholder="Ihr vollständiger Name"
                        />
                        {formErrors.name && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-white font-medium mb-2"
                        >
                          E-Mail *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={cn(
                            "w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400",
                            "focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors",
                            formErrors.email
                              ? "border-red-400"
                              : "border-white/30"
                          )}
                          placeholder="ihre.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-white font-medium mb-2"
                        >
                          Telefon (optional)
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={cn(
                            "w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400",
                            "focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors",
                            formErrors.phone
                              ? "border-red-400"
                              : "border-white/30"
                          )}
                          placeholder="+49 123 456789"
                        />
                        {formErrors.phone && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-white font-medium mb-2"
                        >
                          Betreff *
                        </label>
                        <input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          className={cn(
                            "w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400",
                            "focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors",
                            formErrors.subject
                              ? "border-red-400"
                              : "border-white/30"
                          )}
                          placeholder="Worum geht es?"
                        />
                        {formErrors.subject && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white font-medium mb-2"
                      >
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={cn(
                          "w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 resize-y",
                          "focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors",
                          formErrors.message
                            ? "border-red-400"
                            : "border-white/30"
                        )}
                        placeholder="Erzählen Sie mir von Ihrem Projekt oder Ihrer Anfrage..."
                      />
                      {formErrors.message && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.message}
                        </p>
                      )}
                      <div className="text-right text-xs text-gray-400 mt-1">
                        {formData.message.length}/1000 Zeichen
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        className="min-w-[200px]"
                      >
                        {isSubmitting
                          ? "Wird gesendet..."
                          : "📤 Nachricht senden"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}

            {/* CV Tab */}
            {activeTab === "cv" && (
              <motion.div
                key="cv"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* CV Header */}
                <Card variant="glass" className="p-8">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">📄</div>
                    <h2 className="text-3xl font-bold text-white">
                      Lebenslauf & Referenzen
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      Laden Sie meinen vollständigen Lebenslauf herunter oder
                      schauen Sie sich die wichtigsten Informationen hier direkt
                      an.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <Button
                        variant="primary"
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        📥 CV herunterladen
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">
                          PDF
                        </span>
                      </Button>

                      <div className="text-sm text-gray-400">
                        Zuletzt aktualisiert:{" "}
                        {cv.lastUpdated
                          ? new Date(cv.lastUpdated).toLocaleDateString("de-DE")
                          : "Unbekannt"}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* CV Sections */}
                <div className="grid md:grid-cols-2 gap-6">
                  {cv.sections?.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass" className="p-6">
                        <div className="text-center">
                          <div className="text-3xl mb-3">
                            {section.title === "Persönliche Daten"
                              ? "👤"
                              : section.title === "Berufserfahrung"
                              ? "💼"
                              : section.title === "Technische Skills"
                              ? "🛠️"
                              : section.title === "Bildung & Zertifikate"
                              ? "🎓"
                              : section.title === "Projekte"
                              ? "🚀"
                              : section.title === "Sprachen"
                              ? "🌍"
                              : "📋"}
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {section.title === "Persönliche Daten" &&
                              "Kontaktinformationen und grundlegende Daten"}
                            {section.title === "Berufserfahrung" &&
                              `${portfolioData.experience.length} Stationen in ${portfolioData.personal.yearsOfExperience}+ Jahren`}
                            {section.title === "Technische Skills" &&
                              `${portfolioData.skills.reduce(
                                (total, cat) => total + cat.items.length,
                                0
                              )} Technologien und Tools`}
                            {section.title === "Bildung & Zertifikate" &&
                              "Ausbildung und kontinuierliche Weiterbildung"}
                            {section.title === "Projekte" &&
                              `${portfolioData.projects.length} ausgewählte Projekte`}
                            {section.title === "Sprachen" &&
                              contact.languages?.join(", ")}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Facts */}
                <Card variant="glass" className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Kurze Übersicht
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-400 mb-1">
                        {personal.yearsOfExperience}+
                      </div>
                      <div className="text-sm text-gray-300">
                        Jahre Erfahrung
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {personal.projects}+
                      </div>
                      <div className="text-sm text-gray-300">
                        Abgeschlossene Projekte
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {personal.happyClients}+
                      </div>
                      <div className="text-sm text-gray-300">
                        Zufriedene Kunden
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        100%
                      </div>
                      <div className="text-sm text-gray-300">
                        Weiterempfehlungsrate
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-teal-900/10 via-blue-900/10 to-cyan-900/10" />
        </div>
      </div>
    </motion.div>
  );
};
