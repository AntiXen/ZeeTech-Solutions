'use client';

import React, { useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import styles from './PinnedScene.module.css';

interface PinnedSceneProps {
  id?: string;
  trackHeight?: string;
  className?: string;
  children: ((progress: MotionValue<number>) => React.ReactNode) | React.ReactNode;
}

export function PinnedScene({
  id,
  trackHeight = '200vh',
  className = '',
  children,
}: PinnedSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section 
      id={id} 
      ref={containerRef} 
      className={`${styles.track} ${className}`.trim()} 
      style={{ height: trackHeight }}
    >
      <div className={styles.sticky}>
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </div>
    </section>
  );
}

export default PinnedScene;
