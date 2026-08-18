'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import styles from './StatCounter.module.css';

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description?: string;
  className?: string;
}

export default function StatCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  description,
  className = '',
}: StatCounterProps) {
  const numSpanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numSpanRef.current;
    if (!el) return;

    if (isReducedMotion()) {
      el.textContent = value.toFixed(decimals);
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: value,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (el) {
                el.textContent = obj.val.toFixed(decimals);
              }
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <div ref={containerRef} className={`${styles.statCard} ${className}`}>
      <div className={styles.statValue}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span ref={numSpanRef} className={styles.num}>
          {value.toFixed(decimals)}
        </span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      <div className={styles.statLabel}>{label}</div>
      {description && <div className={styles.statDesc}>{description}</div>}
    </div>
  );
}
