"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * FadeIn — wraps children in a framer-motion fade+rise that triggers on scroll.
 *
 * Usage:
 *   <FadeIn>...</FadeIn>                       // default: fade + 16px rise
 *   <FadeIn delay={0.1}>...</FadeIn>           // staggered
 *   <FadeIn y={24} duration={0.6}>...</FadeIn> // custom
 *   <FadeIn as="div" className="...">...</FadeIn>
 */
type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  /** pixels to rise from (default 16) */
  y?: number;
  /** seconds (default 0.5) */
  duration?: number;
  /** seconds before animating in (default 0) */
  delay?: number;
  /** animate only once when in view (default true) */
  once?: boolean;
  /** how much of the element must be visible to trigger (default 0.2) */
  amount?: number;
};

export function FadeIn({
  children,
  y = 16,
  duration = 0.5,
  delay = 0,
  once = true,
  amount = 0.2,
  ...rest
}: FadeInProps) {
  return (
    // suppressHydrationWarning: framer-motion's whileInView adds `style` attributes
    // (opacity, transform) that differ between the server-rendered HTML and the
    // client's first paint. The element still animates to the correct state on
    // hydration; this just silences the false-positive React warning.
    <motion.div
      suppressHydrationWarning
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInStagger — parent for staggered children. Use with FadeInItem children.
 */
export function FadeInStagger({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      suppressHydrationWarning
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  y = 20,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode; y?: number }) {
  return (
    <motion.div
      suppressHydrationWarning
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
