'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Approach.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

interface Step {
  id: string;
  number: string;
  heading: string;
  description: string;
}

const steps: Step[] = [
  { id: 's1', number: '01', heading: 'Understand', description: 'We map the business, the users, the problem and the outcome you actually need.' },
  { id: 's2', number: '02', heading: 'Challenge', description: 'We question assumptions when a better path exists — politely, but firmly.' },
  { id: 's3', number: '03', heading: 'Design', description: 'We shape the product experience before writing code, so the build starts right.' },
  { id: 's4', number: '04', heading: 'Build', description: 'We engineer in focused cycles, with working software and honest communication.' },
  { id: 's5', number: '05', heading: 'Launch', description: 'We ship carefully, monitor closely and fix what the real world reveals.' },
  { id: 's6', number: '06', heading: 'Improve', description: 'We measure, learn and keep improving the product long after launch.' },
];

const understandingPoints = [
  { num: '01', text: 'Business' },
  { num: '02', text: 'Users' },
  { num: '03', text: 'Problem' },
  { num: '04', text: 'Desired outcome' },
  { num: '05', text: 'Constraints' },
  { num: '06', text: 'Opportunity' },
];

interface StepItemProps {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isDark: boolean;
}

function StepColumn({ step, index, total, progress, isDark }: StepItemProps) {
  const target = index / (total - 1);
  const accentHex = isDark ? '#22C55E' : '#FF5500';
  const inactiveDotBg = isDark ? '#1a1a1a' : '#E5E7EB';
  const inactiveBorder = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)';

  const numberColor = useTransform(
    progress,
    [Math.max(0, target - 0.12), target, Math.min(1, target + 0.18)],
    [isDark ? '#555555' : '#8E8E98', accentHex, isDark ? '#888888' : '#52525B']
  );

  const dotBg = useTransform(
    progress,
    [Math.max(0, target - 0.08), target, Math.min(1, target + 0.15)],
    [inactiveDotBg, accentHex, accentHex]
  );

  const dotBorder = useTransform(
    progress,
    [Math.max(0, target - 0.08), target, Math.min(1, target + 0.15)],
    [inactiveBorder, accentHex, accentHex]
  );

  const dotScale = useTransform(
    progress,
    [Math.max(0, target - 0.08), target, Math.min(1, target + 0.15)],
    [1, 1.4, 1.15]
  );

  const dotGlow = useTransform(
    progress,
    [Math.max(0, target - 0.08), target, Math.min(1, target + 0.15)],
    ['none', isDark ? '0 0 12px rgba(34,197,94,0.7)' : '0 0 12px rgba(255,85,0,0.5)', 'none']
  );

  const headingColor = useTransform(
    progress,
    [Math.max(0, target - 0.12), target, Math.min(1, target + 0.18)],
    [isDark ? '#777777' : '#8E8E98', isDark ? '#FFFFFF' : '#0A0A0C', isDark ? '#CCCCCC' : '#52525B']
  );

  const descColor = useTransform(
    progress,
    [Math.max(0, target - 0.12), target, Math.min(1, target + 0.18)],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#9E9E9E' : '#52525B', isDark ? '#777777' : '#8E8E98']
  );

  return (
    <div className={styles.stepCol}>
      <motion.div className={styles.stepNumber} style={{ color: numberColor }}>
        {step.number}
      </motion.div>
      <div className={styles.dotCell}>
        <motion.div 
          className={styles.dot} 
          style={{ 
            backgroundColor: dotBg, 
            borderColor: dotBorder, 
            scale: dotScale, 
            boxShadow: dotGlow 
          }} 
        />
      </div>
      <motion.h4 className={styles.stepHeading} style={{ color: headingColor }}>
        {step.heading}
      </motion.h4>
      <motion.p className={styles.stepDescription} style={{ color: descColor }}>
        {step.description}
      </motion.p>
    </div>
  );
}

function ApproachSceneContent({ progress }: { progress: MotionValue<number> }) {
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
            <span className={styles.accent}>06</span> — HOW WE THINK
          </span>
          <h2 className={styles.headline}>
            We don’t start with code. <motion.span style={{ color: accentColor }}>We start with questions.</motion.span>
          </h2>
          <p className={styles.supportingCopy}>
            The consulting comes before the engineering — and it’s why the engineering works.
          </p>
        </div>

        {/* 6-Step Diagrammatic Track */}
        <div className={styles.timelineWrapper}>
          <div className={styles.lineBg} />
          <motion.div className={styles.lineFill} style={{ scaleX: progress }} />
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <StepColumn 
                key={`${step.id}-${theme}`} 
                step={step} 
                index={index} 
                total={steps.length} 
                progress={progress} 
                isDark={isDark}
              />
            ))}
          </div>
        </div>

        {/* Integrated Bottom Understanding Bar */}
        <div className={styles.bottomBar}>
          <span className={styles.bottomPrompt}>Before recommending technology, we understand:</span>
          <div className={styles.pointsList}>
            {understandingPoints.map((point) => (
              <span key={point.num} className={styles.pointTag}>
                <span className={styles.pointNum}>{point.num}</span> {point.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Approach() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="approach" trackHeight="220vh">
      {(progress) => <ApproachSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
