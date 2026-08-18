'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './WhyZeeTech.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

interface Principle {
  number: string;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    number: '01',
    title: 'Business before technology.',
    description: 'We don’t build for the sake of building. Every technical decision starts with your business objective, your users and your bottom line.'
  },
  {
    number: '02',
    title: 'Think beyond the brief.',
    description: 'The best solutions often address the question behind the question. We challenge assumptions respectfully to deliver what you actually need.'
  },
  {
    number: '03',
    title: 'Built for what’s next.',
    description: 'Clean architecture, tested code and scalable infrastructure. We engineer products to grow with your business, not require a rebuild next year.'
  },
  {
    number: '04',
    title: 'Partnership over projects.',
    description: 'We measure our success by your long-term outcomes, not deliverables checked off a list. We stay invested in what we create.'
  }
];

function PrincipleRow({ 
  item, 
  index, 
  total, 
  progress, 
  isDark 
}: { 
  item: Principle; 
  index: number; 
  total: number; 
  progress: MotionValue<number>; 
  isDark: boolean; 
}) {
  const stepStart = 0.15 + (index / total) * 0.7;
  const stepEnd = stepStart + (0.7 / total);

  const numColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#444444' : '#8E8E98', isDark ? '#22C55E' : '#FF5500', isDark ? '#22C55E' : '#FF5500', isDark ? '#777777' : '#52525B']
  );

  const titleColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#666666' : '#8E8E98', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#9E9E9E' : '#52525B']
  );

  const descColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#444444' : '#8E8E98', isDark ? '#9E9E9E' : '#52525B', isDark ? '#9E9E9E' : '#52525B', isDark ? '#666666' : '#8E8E98']
  );

  const lineScaleY = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [0, 1, 1, 0]
  );

  return (
    <div className={styles.rowWrapper}>
      <motion.div className={styles.manifestoRow}>
        <motion.div className={styles.activeLine} style={{ scaleY: lineScaleY }} />
        <motion.span className={styles.num} style={{ color: numColor }}>
          {item.number}
        </motion.span>
        <div className={styles.textBlock}>
          <motion.h3 className={styles.stmtTitle} style={{ color: titleColor }}>
            {item.title}
          </motion.h3>
          <motion.p className={styles.stmtDesc} style={{ color: descColor }}>
            {item.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function WhyZeeTechSceneContent({ progress }: { progress: MotionValue<number> }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = useTransform(
    progress,
    [0.08, 0.4],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>
            <span className={styles.accent}>08</span> — WHY ZEETECH
          </span>
          <h2 className={styles.headline}>
            Four principles that shape <motion.span style={{ color: accentColor }}>every product we build.</motion.span>
          </h2>
        </div>

        <div className={styles.list}>
          {principles.map((item, index) => (
            <PrincipleRow 
              key={`${item.number}-${theme}`} 
              item={item} 
              index={index} 
              total={principles.length} 
              progress={progress} 
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhyZeeTech() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="manifesto" trackHeight="220vh">
      {(progress) => <WhyZeeTechSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
