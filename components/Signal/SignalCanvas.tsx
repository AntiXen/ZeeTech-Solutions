'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Signal.module.css';

export default function SignalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Parallax pointer tracking
  useEffect(() => {
    if (prefersReduced) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={styles.signalContainer}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 1000"
        className={styles.svg}
      >
        <defs>
          <radialGradient id="signalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Central Core Glow with subtle breathing pulse */}
        <motion.circle 
          cx="500" 
          cy="500" 
          r="280" 
          fill="url(#signalGlow)"
          animate={prefersReduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '500px 500px' }}
        />

        {/* Coordinate Grid Lines */}
        <line x1="200" y1="500" x2="800" y2="500" stroke="var(--divider)" strokeWidth="0.75" />
        <line x1="500" y1="200" x2="500" y2="800" stroke="var(--divider)" strokeWidth="0.75" />

        {/* Orbital Ring 1: Continuous Clockwise Spin */}
        <motion.ellipse
          cx="500"
          cy="500"
          rx="180"
          ry="175"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="0.85"
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '500px 500px' }}
        />

        {/* Orbital Ring 2 (Dashed): Continuous Counter-Clockwise Spin */}
        <motion.ellipse
          cx="500"
          cy="500"
          rx="300"
          ry="290"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={prefersReduced ? undefined : { rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '500px 500px' }}
        />

        {/* Orbital Ring 3 (Outer): Continuous Clockwise Spin */}
        <motion.ellipse
          cx="500"
          cy="500"
          rx="420"
          ry="400"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.15"
          strokeWidth="0.75"
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '500px 500px' }}
        />

        {/* Trajectory Beziers: Continuous Counter-Clockwise Spin */}
        <motion.g
          animate={prefersReduced ? undefined : { rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '500px 500px' }}
        >
          <path
            d="M 260 500 C 260 360, 360 260, 500 260 C 640 260, 740 360, 740 500"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.22"
            strokeWidth="0.75"
            strokeDasharray="6 12"
          />
          <path
            d="M 320 620 C 400 700, 600 700, 680 620"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
        </motion.g>

        {/* Signal Orbiting Nodes: Continuous Clockwise Spin */}
        <motion.g
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '500px 500px' }}
        >
          <circle cx="500" cy="320" r="3.5" fill="var(--accent)" opacity="0.9" />
          <circle cx="680" cy="500" r="3" fill="var(--accent)" opacity="0.75" />
          <circle cx="320" cy="500" r="2.5" fill="var(--accent)" opacity="0.6" />
          <circle cx="500" cy="680" r="4" fill="var(--accent)" opacity="0.85" />
          <circle cx="390" cy="390" r="2.5" fill="var(--accent)" opacity="0.7" />
          <circle cx="610" cy="610" r="3" fill="var(--accent)" opacity="0.7" />
        </motion.g>

        {/* Technical Crosshairs */}
        <g stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.75">
          <line x1="494" y1="500" x2="506" y2="500" />
          <line x1="500" y1="494" x2="500" y2="506" />
        </g>
        <g stroke="var(--text-muted)" strokeWidth="0.5">
          <line x1="675" y1="325" x2="685" y2="325" />
          <line x1="680" y1="320" x2="680" y2="330" />
        </g>
      </svg>
    </div>
  );
}
