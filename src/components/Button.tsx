"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import * as React from "react";
import { HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "px-6 py-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60",
        variant === "primary"
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-secondary text-white hover:bg-secondary/90",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = "Button";

export default Button; 