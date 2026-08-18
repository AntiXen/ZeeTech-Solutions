'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import styles from './ScrollText.module.css';

interface ScrollTextProps {
  children: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'blockquote' | 'div';
  mode?: 'words' | 'lines';
}

interface WordSegmentProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function WordSegment({ word, index, total, progress }: WordSegmentProps) {
  // Compute active range for this specific word
  const start = index / total;
  const end = (index + 1) / total;

  // Window of illumination: becomes warm white, then settles to clear readable tone
  const color = useTransform(
    progress,
    [
      Math.max(0, start - 0.1),
      start,
      end,
      Math.min(1, end + 0.15)
    ],
    [
      '#444444', // Dark/muted before active
      '#F0EDE8', // Near-white / illuminated when active
      '#F0EDE8', // Holds near-white during read zone
      '#888888'  // Settles to clear secondary after scroll passes
    ]
  );

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.1),
      start,
      end,
      Math.min(1, end + 0.2)
    ],
    [0.35, 1, 1, 0.85]
  );

  return (
    <motion.span style={{ color, opacity }} className={styles.word}>
      {word}{' '}
    </motion.span>
  );
}

export function ScrollText({ 
  children, 
  className = '', 
  as: Component = 'p',
  mode = 'words'
}: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  if (shouldReduceMotion) {
    return (
      <Component className={`${styles.container} ${styles.reducedMotion} ${className}`.trim()}>
        {children}
      </Component>
    );
  }

  // Split into words or lines
  const tokens = mode === 'words' 
    ? children.trim().split(/\s+/)
    : children.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <Component className={`${styles.container} ${className}`.trim()}>
        {tokens.map((token, i) => (
          <WordSegment
            key={i}
            word={token}
            index={i}
            total={tokens.length}
            progress={scrollYProgress}
          />
        ))}
      </Component>
    </div>
  );
}

export default ScrollText;
