"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import * as React from "react";

type CardProps = {
  image?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ image, title, description, className, children }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={clsx(
        "p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-card border border-gray-100 dark:border-zinc-800",
        className
      )}
    >
      {image && (
        <Image src={image} alt={title || "Card image"} width={80} height={80} className="rounded-xl object-cover mb-2" />
      )}
      {title && <h3 className="text-lg font-bold mb-1 text-primary">{title}</h3>}
      {description && <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>}
      {children}
    </motion.div>
  )
);

Card.displayName = "Card";

export default Card; 