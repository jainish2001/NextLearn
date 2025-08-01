"use client";

import { motion } from "@/lib/motion";
import clsx from "clsx";
import * as React from "react";
import { HTMLMotionProps } from "framer-motion";

// Define ButtonProps: accepts motion props for a button plus a custom variant
type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary"; // Defines styling variant
  children: React.ReactNode;         // Button label or content
};

// Forward-ref button component using framer-motion for animation
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      // Apply scaling animation on hover and tap
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      // Combine base styles, variant styles, and any additional class names
      className={clsx(
        "px-6 py-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60",
        variant === "primary"
          ? "bg-primary text-black dark:text-white hover:bg-primary/90"
          : "bg-secondary text-black dark:text-white hover:bg-secondary/90",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);

// Helps with debugging and display in React DevTools
Button.displayName = "Button";

export default Button;
