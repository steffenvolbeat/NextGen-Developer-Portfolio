"use client";

import { useState } from "react";
import Canvas3D from "@/components/3d/Canvas3D";
import PortfolioStations from "@/components/3d/PortfolioStations";
import { StationManagerProvider } from "@/contexts/StationManager";
import { NavigationHUD } from "@/components/hud/NavigationHUD";
import { StationOverlayManager } from "@/components/hud/StationOverlayManager";
import { LandingPage } from "@/components/LandingPage";
import { LoadingSequence } from "@/components/LoadingSequence";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function Home() {
  // State für den Workflow: 'landing' -> 'loading' -> 'portfolio'
  const [currentView, setCurrentView] = useState<
    "landing" | "loading" | "portfolio"
  >("landing");

  const handleEnterClick = () => {
    setCurrentView("loading");
  };

  const handleLoadingComplete = () => {
    setCurrentView("portfolio");
  };

  return (
    <ThemeProvider>
      {/* Startseite mit Enter Button */}
      {currentView === "landing" && (
        <LandingPage
          onEnter={handleEnterClick}
          onStartSequence={handleEnterClick}
        />
      )}

      {/* 3D-Würfel Animation (fällt in CPU, erscheint wieder) */}
      {currentView === "loading" && (
        <LoadingSequence onComplete={handleLoadingComplete} />
      )}

      {/* Haupt-Portfolio mit 3D-Stationen */}
      {currentView === "portfolio" && (
        <StationManagerProvider>
          <div className="relative w-full h-screen overflow-hidden bg-background">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* 3D Portfolio Environment */}
            <Canvas3D>
              {/* Portfolio Stations mit interaktiven Bereichen */}
              <PortfolioStations position={[0, 0, 0]} />
            </Canvas3D>

            {/* UI Overlays */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Portfolio Header - ZENTRIERT */}
              <header className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                <div className="bg-background-secondary/80 backdrop-blur-md border border-border rounded-xl p-4">
                  <h1 className="text-xl font-bold text-foreground text-center">
                    NextGen Developer Portfolio
                  </h1>
                  <p className="text-accent-primary text-sm mt-1 text-center">
                    3D Interactive Experience
                  </p>
                </div>
              </header>

              {/* Navigation HUD */}
              <div className="pointer-events-auto">
                <NavigationHUD />
              </div>

              {/* Footer */}
              <footer className="absolute bottom-6 right-6 z-30">
                <div className="bg-background-secondary/80 backdrop-blur-md border border-border rounded-xl p-3">
                  <div className="text-xs text-foreground-muted text-center">
                    Made with ❤️ using Next.js & Three.js
                  </div>
                </div>
              </footer>
            </div>

            {/* Station Content Overlays */}
            <StationOverlayManager />

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-linear-to-b from-scene-background-from via-scene-background-via to-scene-background-to" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-primary/20 via-transparent to-transparent" />

              {/* Animated Stars */}
              <div className="absolute inset-0 opacity-60">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-foreground rounded-full animate-pulse"
                    style={{
                      left: `${(i * 7.23) % 100}%`,
                      top: `${(i * 11.37) % 100}%`,
                      animationDelay: `${(i * 0.02) % 2}s`,
                      animationDuration: `${2 + ((i * 0.03) % 3)}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </StationManagerProvider>
      )}
    </ThemeProvider>
  );
}
