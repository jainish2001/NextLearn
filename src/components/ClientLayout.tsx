"use client";

import { useEffect, ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const grid = document.getElementById("grid-background");
    if (!grid) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.1;
    let rafId: number;
    let isVisible = !document.hidden;
    let lastMoveTime = Date.now();

    const setWebkitMask = (value: string) => {
      (grid.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = value;
    };

    const updateMask = (x: number, y: number) => {
      const mask = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
      grid.style.maskImage = mask;
      setWebkitMask(mask);
      grid.style.opacity = "1";
    };

    const hideMask = () => {
      grid.style.opacity = "0";
    };

    const updatePosition = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      const now = Date.now();
      const idleTime = now - lastMoveTime;

      if (isVisible && idleTime < 300) {
        updateMask(currentX, currentY);
      } else {
        hideMask();
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
    };

    const handleMouseLeave = () => {
      hideMask();
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (!isVisible) {
        hideMask();
      } else {
        currentX = mouseX;
        currentY = mouseY;
        updateMask(currentX, currentY);
      }
    };

    const handleFocus = () => {
      currentX = mouseX;
      currentY = mouseY;
      updateMask(currentX, currentY);
    };

    // Attach listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafId = requestAnimationFrame(updatePosition);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="grid-background" />
      <div className="relative z-10">{children}</div>
    </>
  );
}
