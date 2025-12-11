"use client";

import React from "react";
import { useStationManager } from "@/contexts/StationManager";
import {
  AboutStation,
  SkillsStation,
  ExperienceStation,
  ContactStation,
  TestimonialsStation,
  BackstageStation,
  WorksStation,
  ResumeStation,
} from "@/components/stations";

export const StationOverlayManager: React.FC = () => {
  const { activeStation, activateStation } = useStationManager();

  const handleCloseStation = () => {
    activateStation(null);
  };

  return (
    <>
      {/* Testimonials Station */}
      <TestimonialsStation
        isActive={activeStation === "testimonials"}
        onClose={handleCloseStation}
      />

      {/* Backstage Station */}
      <BackstageStation
        isActive={activeStation === "backstage"}
        onClose={handleCloseStation}
      />

      {/* Works Station */}
      <WorksStation
        isActive={activeStation === "works"}
        onClose={handleCloseStation}
      />

      {/* Contact Station */}
      <ContactStation
        isActive={activeStation === "contact"}
        onClose={handleCloseStation}
      />

      {/* Resume Station */}
      <ResumeStation
        isActive={activeStation === "resume"}
        onClose={handleCloseStation}
      />

      {/* Experience Station */}
      <ExperienceStation
        isActive={activeStation === "experience"}
        onClose={handleCloseStation}
      />

      {/* About Station */}
      <AboutStation
        isActive={activeStation === "about"}
        onClose={handleCloseStation}
      />

      {/* Skills Station */}
      <SkillsStation
        isActive={activeStation === "skills"}
        onClose={handleCloseStation}
      />
    </>
  );
};
