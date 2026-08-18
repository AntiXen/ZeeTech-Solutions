'use client';

import React, { useRef } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

interface ScrollProgressProps {
  children: (progress: MotionValue<number>) => React.ReactNode;
  offset?: UseScrollOptions['offset'];
}

export function ScrollProgress({
  children,
  offset = ['start end', 'end start'],
}: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return (
    <div ref={ref}>
      {children(scrollYProgress)}
    </div>
  );
}

export default ScrollProgress;
