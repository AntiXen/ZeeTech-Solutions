'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, MotionValue, useReducedMotion } from 'framer-motion';
import styles from './Signal.module.css';

interface SignalCanvasProps {
  scrollProgress: MotionValue<number>;
}

export default function SignalCanvas({ scrollProgress }: SignalCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll transforms
  const opacity = useTransform(scrollProgress, [0, 1], [1, 0.3]);
  const rotation = useTransform(scrollProgress, [0, 1], [0, 8]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // max shift ±15px
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch, prefersReducedMotion]);

  const xOffset = prefersReducedMotion ? 0 : mousePos.x;
  const yOffset = prefersReducedMotion ? 0 : mousePos.y;

  return (
    <motion.div 
      ref={containerRef}
      className={styles.signalContainer}
      style={{
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
        x: xOffset,
        y: yOffset
      }}
    >
      <motion.svg 
        viewBox="0 0 1200 1200" 
        className={styles.svg}
        style={{
          rotate: prefersReducedMotion ? 0 : rotation
        }}
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF1F71" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF1F71" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center Glow */}
        <circle cx="600" cy="600" r="200" fill="url(#centerGlow)" />

        {/* Coordinate Grid Lines */}
        <line x1="600" y1="0" x2="600" y2="1200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="0" y1="600" x2="1200" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Orbital Rings */}
        <ellipse cx="600" cy="600" rx="200" ry="120" stroke="rgba(255,31,113,0.15)" strokeWidth="1" fill="none" transform="rotate(15 600 600)" />
        <ellipse cx="600" cy="600" rx="320" ry="200" stroke="rgba(255,31,113,0.12)" strokeWidth="0.8" fill="none" transform="rotate(-10 600 600)" />
        <ellipse cx="600" cy="600" rx="450" ry="280" stroke="rgba(255,31,113,0.1)" strokeWidth="0.6" fill="none" transform="rotate(25 600 600)" />
        <ellipse cx="600" cy="600" rx="600" ry="380" stroke="rgba(255,31,113,0.08)" strokeWidth="0.5" fill="none" transform="rotate(-5 600 600)" />

        {/* Trajectory Lines (Beziers) */}
        <path d="M 600 600 C 700 400, 900 300, 1100 200" stroke="rgba(255,31,113,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="10 5" />
        <path d="M 600 600 C 400 700, 300 900, 100 1100" stroke="rgba(255,31,113,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="15 10" />
        <path d="M 600 600 C 800 800, 1000 900, 1150 1000" stroke="rgba(255,31,113,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="12 6" />
        <path d="M 600 600 C 500 400, 300 200, 150 100" stroke="rgba(255,31,113,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="8 4" />
        <path d="M 600 600 C 750 650, 950 500, 1100 400" stroke="rgba(255,31,113,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="20 10" />

        {/* Nodes */}
        <circle cx="782" cy="510" r="2.5" fill="rgba(255,31,113,0.6)" />
        <circle cx="430" cy="710" r="2" fill="rgba(255,31,113,0.3)" />
        <circle cx="890" cy="760" r="3" fill="rgba(255,31,113,0.6)" />
        <circle cx="340" cy="380" r="2" fill="rgba(255,31,113,0.3)" />
        <circle cx="950" cy="480" r="2.5" fill="rgba(255,31,113,0.3)" />
        <circle cx="680" cy="320" r="2" fill="rgba(255,31,113,0.3)" />
        <circle cx="480" cy="850" r="2" fill="rgba(255,31,113,0.6)" />
        <circle cx="210" cy="580" r="2" fill="rgba(255,31,113,0.3)" />
        <circle cx="1020" cy="340" r="2.5" fill="rgba(255,31,113,0.3)" />

        {/* Cross Marks */}
        <g stroke="var(--text-muted, #555555)" strokeWidth="1" opacity="0.3">
          <line x1="777" y1="510" x2="787" y2="510" />
          <line x1="782" y1="505" x2="782" y2="515" />
          
          <line x1="335" y1="380" x2="345" y2="380" />
          <line x1="340" y1="375" x2="340" y2="385" />

          <line x1="885" y1="760" x2="895" y2="760" />
          <line x1="890" y1="755" x2="890" y2="765" />
        </g>
      </motion.svg>
    </motion.div>
  );
}
