'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Proposition.module.css';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

interface BenefitItem {
  num: string;
  title: string;
}

const items: BenefitItem[] = [
  { num: '01', title: 'Business understanding' },
  { num: '02', title: 'Product thinking' },
  { num: '03', title: 'Technical expertise' },
  { num: '04', title: 'Strategic advice' },
  { num: '05', title: 'Long-term partnership' }
];

function PropositionItemRow({ item, index, total, progress }: { item: BenefitItem; index: number; total: number; progress: MotionValue<number> }) {
  // Focus window for each benefit item across 0.35 -> 0.85 progress
  const stepStart = 0.35 + (index / total) * 0.45;
  const stepEnd = stepStart + (0.45 / total);

  const numColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.05), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    ['#444444', '#FF1F71', '#FF1F71', '#666666']
  );

  const titleColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.05), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    ['#555555', '#F0EDE8', '#F0EDE8', '#777777']
  );

  const lineScaleY = useTransform(
    progress,
    [Math.max(0, stepStart - 0.05), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [0, 1, 1, 0]
  );

  const rowX = useTransform(
    progress,
    [Math.max(0, stepStart - 0.05), stepStart, stepEnd, Math.min(1, stepEnd + 0.08)],
    [0, 6, 6, 0]
  );

  return (
    <div className={styles.rowWrapper}>
      <motion.div className={styles.listItem} style={{ x: rowX }}>
        <motion.div className={styles.itemAccentLine} style={{ scaleY: lineScaleY }} />
        <motion.span className={styles.itemNumber} style={{ color: numColor }}>
          {item.num}
        </motion.span>
        <motion.span className={styles.itemTitle} style={{ color: titleColor }}>
          {item.title}
        </motion.span>
      </motion.div>
    </div>
  );
}

function PropositionSceneContent({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0, 0.15, 0.88, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0, 0.15, 0.88, 1], [30, 0, 0, -30]);

  const ambitionColor = useTransform(progress, [0.1, 0.3], ['#F0EDE8', '#FF1F71']);
  const techColor = useTransform(progress, [0.2, 0.4], ['#555555', '#FF1F71']);

  return (
    <motion.div 
      className={styles.sceneViewport}
      style={{ opacity: sceneOpacity, y: sceneY }}
    >
      <div className={styles.container}>
        <span className={styles.label}>
          <span className={styles.accent}>02</span> — BRAND PROPOSITION
        </span>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <h2 className={styles.headline}>
              You bring the <motion.span style={{ color: ambitionColor }}>ambition</motion.span>.<br />
              We bring the <motion.span style={{ color: techColor }}>technology</motion.span>.
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

          <div className={styles.rightCol}>
            <div className={styles.subtitle}>What you get with ZeeTech</div>
            <div className={styles.list}>
              {items.map((item, index) => (
                <PropositionItemRow 
                  key={item.num} 
                  item={item} 
                  index={index} 
                  total={items.length} 
                  progress={progress} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PropositionClient() {
  return (
    <ScrollScene id="proposition" trackHeight="250vh">
      {(progress) => <PropositionSceneContent progress={progress} />}
    </ScrollScene>
  );
}
