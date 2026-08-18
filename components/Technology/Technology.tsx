'use client';

import React, { useState } from 'react';
import { motion, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import styles from './Technology.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { TechLogo } from './TechLogos';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

interface TechCategory {
  title: string;
  items: string[];
}

const categories: TechCategory[] = [
  {
    title: 'Interfaces',
    items: ['React', 'Next.js', 'Flutter', 'TypeScript', 'Tailwind CSS', 'Figma']
  },
  {
    title: 'Systems',
    items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs']
  },
  {
    title: 'Cloud & Operations',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Vercel']
  },
  {
    title: 'Intelligence',
    items: ['OpenAI / LLMs', 'LangChain', 'PyTorch', 'Vector Databases', 'Custom Pipelines', 'Data Automation']
  }
];

function TechItemRow({
  item,
  arrowColor,
  itemColor,
  isDark,
}: {
  item: string;
  arrowColor: MotionValue<string>;
  itemColor: MotionValue<string>;
  isDark: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.item} ${isHovered ? styles.itemActive : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? { scale: 1.04, x: 4 } : { scale: 1, x: 0 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      {/* Rapid Logo / Arrow Morph */}
      <div className={styles.iconSlot}>
        <AnimatePresence mode="popLayout" initial={false}>
          {isHovered ? (
            <motion.div
              key="logo"
              className={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
            >
              <TechLogo name={item} />
            </motion.div>
          ) : (
            <motion.span
              key="arrow"
              className={styles.arrow}
              style={{ color: arrowColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
            >
              →
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.span
        className={styles.itemName}
        style={{ color: isHovered ? (isDark ? '#FFFFFF' : '#0A0A0C') : itemColor }}
      >
        {item}
      </motion.span>
    </motion.div>
  );
}

function TechColumn({
  cat,
  index,
  total,
  progress,
  isDark,
  theme,
}: {
  cat: TechCategory;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isDark: boolean;
  theme: string;
}) {
  const stepStart = 0.15 + (index / total) * 0.7;
  const stepEnd = stepStart + 0.7 / total;

  const headerColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#666666' : '#8E8E98', isDark ? '#22C55E' : '#FF5500', isDark ? '#22C55E' : '#FF5500', isDark ? '#888888' : '#52525B']
  );

  const itemColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#9E9E9E' : '#52525B']
  );

  const arrowColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [isDark ? '#333333' : '#D1D1D8', isDark ? '#22C55E' : '#FF5500', isDark ? '#22C55E' : '#FF5500', isDark ? '#555555' : '#8E8E98']
  );

  return (
    <div className={styles.column}>
      <motion.div className={styles.groupHeader} style={{ color: headerColor }}>
        {cat.title}
      </motion.div>
      <div className={styles.itemsList}>
        {cat.items.map((item) => (
          <TechItemRow
            key={`${item}-${theme}`}
            item={item}
            arrowColor={arrowColor}
            itemColor={itemColor}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

function TechnologySceneContent({ progress }: { progress: MotionValue<number> }) {
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
        <div className={styles.topArea}>
          <span className={styles.label}>
            <span className={styles.accent}>10</span> — TECHNOLOGY
          </span>
          <h2 className={styles.headline}>
            The right tool for the <motion.span style={{ color: accentColor }}>problem</motion.span>.<br />
            Never the other way around.
          </h2>
          <p className={styles.supportingText}>
            We select technologies based on scalability, team velocity, maintenance cost, and long-term viability — not industry trends.
          </p>
        </div>

        <div className={styles.indexGrid}>
          {categories.map((cat, index) => (
            <TechColumn
              key={`${cat.title}-${theme}`}
              cat={cat}
              index={index}
              total={categories.length}
              progress={progress}
              isDark={isDark}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Technology() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="technology" trackHeight="220vh">
      {(progress) => <TechnologySceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
