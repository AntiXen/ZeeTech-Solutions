'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Proposition.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

const items = [
  { num: '01', title: 'Business understanding' },
  { num: '02', title: 'Product thinking' },
  { num: '03', title: 'Technical expertise' },
  { num: '04', title: 'Strategic advice' },
  { num: '05', title: 'Long-term partnership' }
];

interface PropositionSceneProps {
  progress: MotionValue<number>;
}

function PropositionSceneContent({ progress }: PropositionSceneProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const ambitionColor = useTransform(
    progress,
    [0.05, 0.35],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );
  const techColor = useTransform(
    progress,
    [0.2, 0.55],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        <span className={styles.label}>
          <span className={styles.accent}>02</span> — BRAND PROPOSITION
        </span>

        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <h2 className={styles.headline}>
              <span>You bring the </span>
              <motion.span style={{ color: ambitionColor }}>ambition.</motion.span>
              <br />
              <span>We bring the </span>
              <motion.span style={{ color: techColor }}>technology.</motion.span>
            </h2>

            <div className={styles.bodyText}>
              <p className={styles.paragraph}>
                Most software projects drift because the builder was waiting for instructions. We work the other way: alongside you — understanding the business behind the build, asking the questions that turn a rough idea into a precise product, and challenging the answers that won&apos;t hold up.
              </p>
              <p className={styles.paragraph}>
                You don&apos;t need to arrive with a perfect technical specification. Bring us the problem, the ambition or the idea. We&apos;ll help figure out what comes next.
              </p>
            </div>
          </div>

          {/* Right Column: 5 Sequential Benefit Items */}
          <div className={styles.rightCol}>
            <div className={styles.subtitle}>What you get with ZeeTech</div>
            <div className={styles.list}>
              {items.map((item, index) => {
                const stepStart = 0.15 + (index / items.length) * 0.7;
                const stepEnd = stepStart + (0.7 / items.length);

                return (
                  <PropositionItem
                    key={`${item.num}-${theme}`}
                    item={item}
                    progress={progress}
                    stepStart={stepStart}
                    stepEnd={stepEnd}
                    isDark={isDark}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropositionItem({
  item,
  progress,
  stepStart,
  stepEnd,
  isDark
}: {
  item: { num: string; title: string };
  progress: MotionValue<number>;
  stepStart: number;
  stepEnd: number;
  isDark: boolean;
}) {
  const numColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.06)],
    [isDark ? '#444444' : '#8E8E98', isDark ? '#22C55E' : '#FF5500', isDark ? '#22C55E' : '#FF5500', isDark ? '#777777' : '#52525B']
  );

  const titleColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.06)],
    [isDark ? '#666666' : '#8E8E98', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#9E9E9E' : '#52525B']
  );

  const lineScaleY = useTransform(
    progress,
    [Math.max(0, stepStart - 0.06), stepStart, stepEnd, Math.min(1, stepEnd + 0.06)],
    [0, 1, 1, 0]
  );

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.listItem}>
        <motion.div className={styles.itemAccentLine} style={{ scaleY: lineScaleY }} />
        <motion.span className={styles.itemNumber} style={{ color: numColor }}>
          {item.num}
        </motion.span>
        <motion.span className={styles.itemTitle} style={{ color: titleColor }}>
          {item.title}
        </motion.span>
      </div>
    </div>
  );
}

export default function Proposition() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="proposition" trackHeight="200vh">
      {(progress) => <PropositionSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
