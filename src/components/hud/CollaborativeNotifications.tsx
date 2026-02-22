"use client";

import { useState, useEffect } from "react";

interface CollaborativeNotificationsProps {
  visible: boolean;
  player1Position: [number, number, number];
  player2Position: [number, number, number];
}

/**
 * Collaborative Notifications
 * Zeigt Benachrichtigungen für Multiplayer-Interaktionen
 */
export function CollaborativeNotifications({
  visible,
  player1Position,
  player2Position,
}: CollaborativeNotificationsProps) {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [lastNotificationTime, setLastNotificationTime] = useState(0);

  // Station-Positionen
  const stations = {
    testimonials: [-12, 1.3, -8],
    backstage: [-12, 1.3, 8],
    works: [0, 1.3, 14],
    contact: [12, 1.3, 8],
    resume: [12, 1.3, -8],
    experience: [-4, 1.3, -14],
    skills: [4, 1.3, -14],
    about: [0, 1.3, -16],
  };

  useEffect(() => {
    if (!visible) return;

    const now = Date.now();
    if (now - lastNotificationTime < 3000) return; // Throttle notifications

    const distance = Math.sqrt(
      Math.pow(player1Position[0] - player2Position[0], 2) +
        Math.pow(player1Position[2] - player2Position[2], 2)
    );

    // Spieler sind nah beieinander
    if (distance < 2.0) {
      addNotification("🤝 Spieler sind nah beieinander!");
      setLastNotificationTime(now);
      return;
    }

    // Prüfe ob beide Spieler an derselben Station sind
    Object.entries(stations).forEach(([stationName, stationPos]) => {
      const dist1 = Math.sqrt(
        Math.pow(player1Position[0] - stationPos[0], 2) +
          Math.pow(player1Position[2] - stationPos[2], 2)
      );

      const dist2 = Math.sqrt(
        Math.pow(player2Position[0] - stationPos[0], 2) +
          Math.pow(player2Position[2] - stationPos[2], 2)
      );

      if (dist1 < 2.5 && dist2 < 2.5) {
        addNotification(`🎯 Beide Spieler bei ${stationName.toUpperCase()}!`);
        setLastNotificationTime(now);
      }
    });
  }, [player1Position, player2Position, visible, lastNotificationTime]);

  const addNotification = (message: string) => {
    setNotifications((prev) => {
      const newNotifications = [message, ...prev.slice(0, 2)];
      return newNotifications;
    });

    // Auto-remove nach 4 Sekunden
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== message));
    }, 4000);
  };

  if (!visible || notifications.length === 0) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-linear-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm border border-purple-300/50 rounded-lg px-6 py-3 shadow-xl animate-bounce"
            style={{
              animationDelay: `${index * 200}ms`,
              animationDuration: "2s",
              animationIterationCount: "1",
            }}
          >
            <div className="text-white text-center font-semibold text-lg">
              {notification}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
