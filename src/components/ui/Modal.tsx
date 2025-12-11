"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import type { ModalProps } from "@/types/portfolio";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closable = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closable]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closable && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full bg-white dark:bg-slate-800 rounded-lg shadow-2xl",
          "transform transition-all duration-300 ease-out",
          "animate-in fade-in zoom-in-95",
          sizeClasses[size],
          size === "full" ? "h-full" : "max-h-[90vh]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>
          {closable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              ✕
            </Button>
          )}
        </div>

        {/* Content */}
        <div
          className={cn(
            "p-6",
            size === "full"
              ? "overflow-auto flex-1"
              : "max-h-[70vh] overflow-auto"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );

  // Render portal only on client
  if (typeof window === "undefined") return null;

  return createPortal(modalContent, document.body);
}
