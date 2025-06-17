"use client";

import { useEffect, ReactNode } from "react";

// Layout component that adds a dynamic spotlight effect to the background
export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const grid = document.getElementById("grid-background");
    if (!grid) return;

    // Track mouse and animation positions
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.1;
    let rafId: number;
    let isVisible = !document.hidden;

    // Generate radial mask based on current mouse position
    const updateMask = (x: number, y: number) => {
      const mask = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;

      grid.style.maskImage = mask;

      // Apply deprecated WebKit-specific mask for Safari support using safe typing
      (grid.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = mask;
    };

    // Animate spotlight to follow mouse with easing
    const updatePosition = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (isVisible) updateMask(currentX, currentY);

      rafId = requestAnimationFrame(updatePosition);
    };

    // Update mouse position on move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Pause animation and hide mask when tab is not visible
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;

      if (!isVisible) {
        const hiddenMask = `radial-gradient(circle at 0 0, rgba(0,0,0,1) 0px, rgba(0,0,0,0) 0px)`;
        grid.style.maskImage = hiddenMask;
        (grid.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = hiddenMask;
      } else {
        currentX = mouseX;
        currentY = mouseY;
        updateMask(currentX, currentY);
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    // Handle spotlight reactivation on window focus
    const handleFocus = () => {
      currentX = mouseX;
      currentY = mouseY;
      updateMask(currentX, currentY);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    rafId = requestAnimationFrame(updatePosition);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* This is the dynamic background grid being masked */}
      <div id="grid-background" />

      {/* Children content layered on top of the animated background */}
      <div className="relative z-10">{children}</div>
    </>
  );
}
