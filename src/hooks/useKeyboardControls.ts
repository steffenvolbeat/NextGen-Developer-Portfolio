"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface KeyboardState {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  shift: boolean; // für Turbo/Sprint
  space: boolean; // für Sprung/Aktion
}

interface UseKeyboardControlsOptions {
  enableMovement?: boolean;
  enabledKeys?: (keyof KeyboardState)[];
}

/**
 * Custom Hook für WASD Keyboard-Controls
 * Verwaltet Tastatureingaben für 3D-Avatar-Bewegung
 */
export function useKeyboardControls(options: UseKeyboardControlsOptions = {}) {
  const {
    enableMovement = true,
    enabledKeys = [
      "moveForward",
      "moveBackward",
      "moveLeft",
      "moveRight",
      "shift",
      "space",
    ],
  } = options;

  const [keys, setKeys] = useState<KeyboardState>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    shift: false,
    space: false,
  });

  // Ref für aktuelle Keys (für cleanup)
  const keysRef = useRef(keys);
  keysRef.current = keys;

  // Key-Mapping
  const keyMap: Record<string, keyof KeyboardState> = {
    KeyW: "moveForward",
    ArrowUp: "moveForward",
    KeyS: "moveBackward",
    ArrowDown: "moveBackward",
    KeyA: "moveLeft",
    ArrowLeft: "moveLeft",
    KeyD: "moveRight",
    ArrowRight: "moveRight",
    ShiftLeft: "shift",
    ShiftRight: "shift",
    Space: "space",
  };

  // Key Down Handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enableMovement) return;

      const key = keyMap[event.code];
      if (key && enabledKeys.includes(key)) {
        event.preventDefault();
        setKeys((prevKeys) => ({
          ...prevKeys,
          [key]: true,
        }));
      }
    },
    [enableMovement, enabledKeys]
  );

  // Key Up Handler
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!enableMovement) return;

      const key = keyMap[event.code];
      if (key && enabledKeys.includes(key)) {
        event.preventDefault();
        setKeys((prevKeys) => ({
          ...prevKeys,
          [key]: false,
        }));
      }
    },
    [enableMovement, enabledKeys]
  );

  // Focus verloren - alle Keys zurücksetzen
  const handleBlur = useCallback(() => {
    setKeys({
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      shift: false,
      space: false,
    });
  }, []);

  // Event Listeners Setup
  useEffect(() => {
    if (!enableMovement) return;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleBlur); // Reset bei Focus-Wechsel

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleBlur);
    };
  }, [enableMovement, handleKeyDown, handleKeyUp, handleBlur]);

  // Hilfsfunktionen
  const isMoving =
    keys.moveForward || keys.moveBackward || keys.moveLeft || keys.moveRight;
  const isSprinting = keys.shift && isMoving;

  // Reset-Funktion
  const resetKeys = useCallback(() => {
    setKeys({
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      shift: false,
      space: false,
    });
  }, []);

  return {
    keys,
    isMoving,
    isSprinting,
    resetKeys,
  };
}

/**
 * Hook für Bewegungsvektor basierend auf Keyboard-Input
 */
export function useMovementVector(
  keyboardState: KeyboardState,
  speed: number = 1
) {
  const calculateMovement = useCallback(() => {
    let x = 0;
    let z = 0;

    // Korrekte 3D-Bewegungsrichtungen
    if (keyboardState.moveForward) z += speed; // W = vorwärts (positive Z)
    if (keyboardState.moveBackward) z -= speed; // S = rückwärts (negative Z)
    if (keyboardState.moveLeft) x += speed; // A = links (positive X) - KORRIGIERT
    if (keyboardState.moveRight) x -= speed; // D = rechts (negative X) - KORRIGIERT

    // Diagonale Bewegung normalisieren
    if (x !== 0 && z !== 0) {
      const length = Math.sqrt(x * x + z * z);
      x = (x / length) * speed;
      z = (z / length) * speed;
    }

    // Sprint-Multiplikator
    const sprintMultiplier = keyboardState.shift ? 2 : 1;

    return {
      x: x * sprintMultiplier,
      z: z * sprintMultiplier,
      isMoving: x !== 0 || z !== 0,
    };
  }, [keyboardState, speed]);

  return calculateMovement();
}
