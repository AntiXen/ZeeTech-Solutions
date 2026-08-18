'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './About.module.css';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

interface Statement {
  number: string;
  title: string;
  description: string;
}

const statements: Statement[] = [
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

function ManifestoRow({ stmt, index, total, progress }: { stmt: Statement; index: number; total: number; progress: MotionValue<number> }) {
  const stepStart = index / total;
  const stepEnd = (index + 1) / total;
  const stepMid = (stepStart + stepEnd) / 2;

  const numColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepMid, Math.min(1, stepEnd + 0.08)],
    ['#333333', '#FF1F71', '#333333']
  );

  const titleColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepMid, Math.min(1, stepEnd + 0.08)],
    ['#555555', '#F0EDE8', '#555555']
  );

  const descColor = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepMid, Math.min(1, stepEnd + 0.08)],
    ['#333333', '#A0A0A0', '#333333']
  );

  const activeLineOpacity = useTransform(
    progress,
    [Math.max(0, stepStart - 0.08), stepMid, Math.min(1, stepEnd + 0.08)],
    [0, 1, 0]
  );

  return (
    <div className={styles.manifestoRow}>
      <motion.div className={styles.activeLine} style={{ opacity: activeLineOpacity }} />
      <motion.span className={styles.num} style={{ color: numColor }}>
        {stmt.number}
      </motion.span>
      <div className={styles.textBlock}>
        <motion.h4 className={styles.stmtTitle} style={{ color: titleColor }}>
          {stmt.title}
        </motion.h4>
        <motion.p className={styles.stmtDesc} style={{ color: descColor }}>
          {stmt.description}
        </motion.p>
      </div>
    </div>
  );
}

function AboutSceneContent({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0, 0.08, 0.92, 1], [20, 0, 0, -20]);

  return (
    <motion.div 
      className={styles.sceneViewport}
      style={{ opacity: sceneOpacity, y: sceneY }}
    >
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <span className={styles.label}>
            <span className={styles.accent}>07</span> — ABOUT ZEETECH
          </span>
          <h2 className={styles.headline}>
            Not another software vendor. <span className={styles.accent}>A strategic product partner.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left: Founder Box */}
          <div className={styles.founderCol}>
            <div className={styles.portraitCard}>
              <div className={styles.figLabel}>FIG. 02 — LEADERSHIP</div>
              <div className={styles.portraitFrame}>
                <div className={styles.crosshair} />
                <span className={styles.portraitPlaceholder}>Founder Portrait</span>
              </div>
              <div className={styles.founderMeta}>
                <div className={styles.founderName}>[CEO Name]</div>
                <div className={styles.founderTitle}>Founder & CEO, ZeeTech</div>
              </div>
              <p className={styles.founderQuote}>
                &ldquo;Anyone can write code. Few understand why. We build technology with the discipline of an engineering team and the strategic clarity of a product owner.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: 4 Manifesto Principles */}
          <div className={styles.manifestoCol}>
            <div className={styles.manifestoList}>
              {statements.map((stmt, i) => (
                <ManifestoRow 
                  key={stmt.number} 
                  stmt={stmt} 
                  index={i} 
                  total={statements.length} 
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

export default function About() {
  return (
    <ScrollScene id="about" trackHeight="260vh">
      {(progress) => <AboutSceneContent progress={progress} />}
    </ScrollScene>
  );
}
