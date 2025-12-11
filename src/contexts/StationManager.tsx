"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Vector3 } from "three";

// Station Identifiers
export type StationType =
  | "testimonials"
  | "backstage"
  | "works"
  | "contact"
  | "resume"
  | "experience"
  | "skills"
  | "about"
  | null;

// Station Positions (matching the futuristic motherboard layout from screenshots)
export const STATION_POSITIONS: Record<Exclude<StationType, null>, Vector3> = {
  testimonials: new Vector3(-12, 1.3, -8),
  backstage: new Vector3(-12, 1.3, 8),
  works: new Vector3(0, 1.3, 14),
  contact: new Vector3(12, 1.3, 8),
  resume: new Vector3(12, 1.3, -8),
  experience: new Vector3(-4, 1.3, -14),
  skills: new Vector3(4, 1.3, -14),
  about: new Vector3(0, 1.3, -16),
};

// Station Metadata
export const STATION_INFO: Record<
  Exclude<StationType, null>,
  {
    name: string;
    description: string;
    color: string;
    icon?: string;
  }
> = {
  testimonials: {
    name: "Testimonials",
    description: "Client feedback and reviews",
    color: "#ff9900",
    icon: "⭐",
  },
  backstage: {
    name: "Backstage",
    description: "Behind the scenes content",
    color: "#00ffff",
    icon: "🎭",
  },
  works: {
    name: "Works",
    description: "Portfolio projects and creations",
    color: "#9933ff",
    icon: "🎨",
  },
  contact: {
    name: "Contact",
    description: "Get in touch and connect",
    color: "#00ff66",
    icon: "📞",
  },
  resume: {
    name: "Resume",
    description: "Professional experience and CV",
    color: "#3399ff",
    icon: "📄",
  },
  experience: {
    name: "Experience",
    description: "Professional work history",
    color: "#999999",
    icon: "💼",
  },
  skills: {
    name: "Skills",
    description: "Technical abilities and expertise",
    color: "#ff0000",
    icon: "⚡",
  },
  about: {
    name: "About Me",
    description: "Personal introduction and background",
    color: "#00aaff",
    icon: "👤",
  },
};

interface StationManagerState {
  activeStation: StationType;
  isTransitioning: boolean;
}

interface StationManagerContextType extends StationManagerState {
  activateStation: (station: StationType) => void;
  getNearestStation: (position: Vector3) => StationType;
  getDistanceToStation: (
    position: Vector3,
    station: Exclude<StationType, null>
  ) => number;
}

const StationManagerContext = createContext<StationManagerContextType | null>(
  null
);

interface StationManagerProviderProps {
  children: React.ReactNode;
}

export const StationManagerProvider: React.FC<StationManagerProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<StationManagerState>({
    activeStation: null,
    isTransitioning: false,
  });

  // Activate a specific station
  const activateStation = useCallback((station: StationType) => {
    setState((prev) => ({
      ...prev,
      activeStation: station,
      isTransitioning: true,
    }));

    // Reset transition flag after animation
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
    }, 500);
  }, []);

  // Get distance between position and station
  const getDistanceToStation = useCallback(
    (position: Vector3, station: Exclude<StationType, null>): number => {
      const stationPos = STATION_POSITIONS[station];
      return position.distanceTo(stationPos);
    },
    []
  );

  // Find nearest station to given position
  const getNearestStation = useCallback((position: Vector3): StationType => {
    let nearestStation: StationType = null;
    let minDistance = Infinity;

    Object.entries(STATION_POSITIONS).forEach(([station, stationPos]) => {
      const distance = position.distanceTo(stationPos);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station as Exclude<StationType, null>;
      }
    });

    return nearestStation;
  }, []);

  const contextValue: StationManagerContextType = {
    ...state,
    activateStation,
    getNearestStation,
    getDistanceToStation,
  };

  return (
    <StationManagerContext.Provider value={contextValue}>
      {children}
    </StationManagerContext.Provider>
  );
};

// Hook to use station manager
export const useStationManager = (): StationManagerContextType => {
  const context = useContext(StationManagerContext);

  if (!context) {
    throw new Error(
      "useStationManager must be used within a StationManagerProvider"
    );
  }

  return context;
};

// Utility function to get station color
export const getStationColor = (station: StationType): string => {
  return station ? STATION_INFO[station].color : "#64748b";
};
