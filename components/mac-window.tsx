"use client";

import type { ReactNode, RefObject } from "react";
import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { PROFILE } from "@/lib/content";

export function MacWindow({
  slug,
  children,
  className = "",
  interactive = false,
  dragConstraintsRef,
}: {
  slug: string;
  children: ReactNode;
  className?: string;
  /** Enables drag + maximize. */
  interactive?: boolean;
  dragConstraintsRef?: RefObject<HTMLElement | null>;
}) {
  const dragControls = useDragControls();
  const [maximized, setMaximized] = useState(false);

  return (
    <motion.div
      drag={interactive && !maximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={dragConstraintsRef}
      animate={interactive && maximized ? { x: 0, y: 0 } : undefined}
      className={
        interactive && maximized
          ? "absolute inset-0 z-20 flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_60px_-24px_var(--accent)]"
          : `relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_60px_-24px_var(--accent)] ${className}`
      }
    >
      <div
        onPointerDown={(e) => {
          if (!interactive || maximized) return;
          dragControls.start(e);
        }}
        className={`flex shrink-0 items-center gap-4 px-5 py-3.5 sm:px-6 ${
          interactive && !maximized ? "cursor-grab select-none active:cursor-grabbing" : ""
        }`}
      >
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          {interactive ? (
            <button
              type="button"
              onClick={() => setMaximized((m) => !m)}
              aria-label={maximized ? "Restaurar" : "Maximizar"}
              className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110"
            />
          ) : (
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          )}
        </div>
        <span className="truncate text-xs font-medium text-muted">
          {PROFILE.name}/{slug}
        </span>
      </div>
      {/* Maximized, the body takes the leftover column height (not `h-full`, which
          would overflow past the title bar and clip its own bottom edge). */}
      <div className={`px-5 pb-6 sm:px-6 sm:pb-8 ${interactive && maximized ? "min-h-0 flex-1 overflow-auto" : ""}`}>
        {children}
      </div>
    </motion.div>
  );
}
