'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import styles from './ScrollText.module.css';

interface ScrollTextProps {
  children: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'blockquote';
}

export function ScrollText({ children, className = '', as = 'p' }: ScrollTextProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Split text into segments by newline
  const segments = children.split('\n').filter((seg) => seg.trim().length > 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const Component = as as keyof JSX.IntrinsicElements;

  if (shouldReduceMotion) {
    return (
      <Component className={`${styles.container} ${styles.primary} ${className}`.trim()}>
        {segments.map((segment, i) => (
          <span key={i} className={styles.segment}>
            {segment}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={ref as any} className={`${styles.container} ${className}`.trim()}>
      {segments.map((segment, i) => {
        const start = i / segments.length;
        const end = (i + 1) / segments.length;

        // Transition from muted to primary to muted as it enters and leaves the active area
        const color = useTransform(
          scrollYProgress,
          [Math.max(0, start - 0.15), start, end, Math.min(1, end + 0.15)],
          ['#555555', '#F0EDE8', '#F0EDE8', '#555555']
        );

        return (
          <motion.span key={i} style={{ color }} className={styles.segment}>
            {segment}
          </motion.span>
        );
      })}
    </Component>
  );
}
