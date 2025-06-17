'use client';

import {
  motion as motionOriginal,
  AnimatePresence as AnimatePresenceOriginal,
  HTMLMotionProps,
  MotionProps,
  Variants,
  Transition,
  TargetAndTransition,
  useAnimation,
  useAnimationControls,
  usePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useViewportScroll,
  useWillChange,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useAnimate,
  useInView,
  useDragControls,
  useCycle,
  useAnimationFrame,
} from 'framer-motion';

// Re-export the components and hooks we need
export const motion = motionOriginal;
export const AnimatePresence = AnimatePresenceOriginal;

// Re-export types
export type { 
  HTMLMotionProps, 
  MotionProps, 
  Variants, 
  Transition, 
  TargetAndTransition 
};

// Re-export hooks
export {
  useAnimation,
  useAnimationControls,
  usePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useViewportScroll,
  useWillChange,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useAnimate,
  useInView,
  useDragControls,
  useCycle,
  useAnimationFrame,
}; 