"use client";

import { useEffect, ReactNode, useCallback, useRef } from "react";

// Layout component that adds a dynamic spotlight effect to the background
export default function ClientLayout({ children }: { children: ReactNode }) {
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    isVisibleRef.current = !document.hidden;
  }, []);


  // Generate radial mask based on current mouse position
  const updateMask = useCallback((x: number, y: number) => {
    const grid = document.getElementById("grid-background");
    if (!grid) return;

    const mask = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
    grid.style.maskImage = mask;
    (grid.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = mask;
  }, []);

  // Animate spotlight to follow mouse with easing
  const updatePosition = useCallback(() => {
    const speed = 0.1;
    currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * speed;
    currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * speed;

    if (isVisibleRef.current) {
      updateMask(currentRef.current.x, currentRef.current.y);
    }

    rafRef.current = requestAnimationFrame(updatePosition);
  }, [updateMask]);

  // Update mouse position on move with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  // Handle visibility changes
  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;

    if (!isVisibleRef.current) {
      const grid = document.getElementById("grid-background");
      if (grid) {
        const hiddenMask = `radial-gradient(circle at 0 0, rgba(0,0,0,1) 0px, rgba(0,0,0,0) 0px)`;
        grid.style.maskImage = hiddenMask;
        (grid.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = hiddenMask;
      }
    } else {
      currentRef.current = { ...mouseRef.current };
      updateMask(currentRef.current.x, currentRef.current.y);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [updateMask, updatePosition]);

  // Handle window focus
  const handleFocus = useCallback(() => {
    currentRef.current = { ...mouseRef.current };
    updateMask(currentRef.current.x, currentRef.current.y);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updatePosition);
  }, [updateMask, updatePosition]);

  useEffect(() => {
    // Initialize position
    const grid = document.getElementById("grid-background");
    if (grid) {
      const rect = grid.getBoundingClientRect();
      currentRef.current = {
        x: rect.width / 2,
        y: rect.height / 2
      };
      updateMask(currentRef.current.x, currentRef.current.y);
    }

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Start animation
    rafRef.current = requestAnimationFrame(updatePosition);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleVisibilityChange, handleFocus, updatePosition, updateMask]);

  return (
    <>
      {/* Dynamic background grid */}
      <div id="grid-background" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </>
  );
}
