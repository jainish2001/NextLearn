"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import clsx from "clsx";
import * as React from "react";

// Define the props accepted by the Card component
type CardProps = {
  image?: string;                // Optional image URL
  title?: string;                // Optional title text
  description?: string;          // Optional description text
  className?: string;            // Additional class names for styling
  children?: React.ReactNode;    // Optional children (e.g., button or extra content)
};

// Card component with animation and flexible layout
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ image, title, description, className, children }, ref) => (
    <motion.div
      ref={ref}
      // Initial animation state
      initial={{ opacity: 0, y: 20 }}
      // Animate into view
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger animation once when ~30% visible
      viewport={{ once: true, amount: 0.3 }}
      // Subtle hover effect
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      // Combine default and custom classes
      className={clsx(
        "p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-card border border-gray-100 dark:border-zinc-800",
        className
      )}
    >
      {/* Optional image at the top */}
      {image && (
        <Image
          src={image}
          alt={title || "Card image"}
          width={80}
          height={80}
          className="rounded-xl object-cover mb-2"
        />
      )}

      {/* Optional title */}
      {title && (
        <h3 className="text-lg font-bold mb-1 text-primary">{title}</h3>
      )}

      {/* Optional description */}
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      )}

      {/* Optional child elements like buttons or extra info */}
      {children}
    </motion.div>
  )
);

// Set display name for debugging in React DevTools
Card.displayName = "Card";

export default Card;
