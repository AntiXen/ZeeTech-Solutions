'use client';

import React, { useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import styles from './ScrollScene.module.css';

interface ScrollSceneProps {
  id?: string;
  trackHeight?: string;
  className?: string;
  viewportClassName?: string;
  children: ((progress: MotionValue<number>) => React.ReactNode) | React.ReactNode;
}

export function ScrollScene({
  id,
  trackHeight = '250vh',
  className = '',
  viewportClassName = '',
  children,
}: ScrollSceneProps) {
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
      <div className={`${styles.viewport} ${viewportClassName}`.trim()}>
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </div>
    </section>
  );
}

export default ScrollScene;
