"use client";

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Variants ─────────────────────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const staggerContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerItemVariants: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

const scaleInVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/* ─── Shared viewport config ────────────────────────────────────────────── */
const VIEWPORT = { once: true, margin: '-80px' } as const;
const VIEWPORT_TIGHT = { once: true, margin: '-40px' } as const;

/* ─── Components ────────────────────────────────────────────────────────── */

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fade + slide-up on scroll entry */
export function FadeUp({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Simple opacity fade on scroll entry */
export function FadeIn({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeInVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scale + fade on scroll entry — good for visual/decorative elements */
export function ScaleIn({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={scaleInVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its direct children on scroll entry */
export function StaggerGrid({ children, className }: Omit<MotionProps, 'delay'>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_TIGHT}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside a StaggerGrid — receives stagger timing automatically */
export function StaggerItem({ children, className }: Omit<MotionProps, 'delay'>) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/** Hero entrance — immediate animation on mount (no scroll trigger) */
export function HeroEnter({
  children,
  className,
  delay = 0,
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered hero container — staggers HeroEnter children on mount */
export function HeroStagger({
  children,
  className,
}: Omit<MotionProps, 'delay'>) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Used inside HeroStagger — each child animates sequentially */
export function HeroItem({ children, className }: Omit<MotionProps, 'delay'>) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Floating animation loop — for the hero decorative visual */
export function FloatLoop({ children, className }: Omit<MotionProps, 'delay'>) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper div with no animation logic — re-exports motion.div for one-off uses */
export { motion };
