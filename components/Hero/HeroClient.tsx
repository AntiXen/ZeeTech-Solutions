'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Hero.module.css';
import SectionLabel from '@/components/shared/SectionLabel/SectionLabel';
import SignalCanvas from '@/components/Signal/SignalCanvas';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

function HeroSceneContent({ progress }: { progress: MotionValue<number> }) {
  // 0% -> 50% progression, 60% -> 100% exit transition
  const headlineScale = useTransform(progress, [0, 0.4, 0.7, 1], [0.95, 1, 1, 0.96]);
  const headlineY = useTransform(progress, [0, 0.4, 0.7, 1], [20, 0, 0, -40]);
  const contentOpacity = useTransform(progress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0]);

  const subTextOpacity = useTransform(progress, [0.1, 0.35, 0.75, 1], [0, 1, 1, 0]);
  const subTextY = useTransform(progress, [0.1, 0.35, 0.75, 1], [15, 0, 0, -25]);

  const ctaOpacity = useTransform(progress, [0.2, 0.45, 0.75, 1], [0, 1, 1, 0]);
  const ctaY = useTransform(progress, [0.2, 0.45, 0.75, 1], [15, 0, 0, -20]);

  const stripOpacity = useTransform(progress, [0, 0.2, 0.65, 0.9], [0.3, 1, 1, 0]);

  return (
    <div className={styles.heroViewport}>
      <SignalCanvas scrollProgress={progress} />

      <div className={styles.contentContainer}>
        <motion.div 
          className={styles.topArea}
          style={{ opacity: contentOpacity, y: headlineY }}
        >
          <SectionLabel number="01" text="STRATEGIC TECHNOLOGY PARTNER" />
        </motion.div>

        <motion.h1 
          className={styles.headline}
          style={{ scale: headlineScale, y: headlineY, opacity: contentOpacity }}
        >
          <span>We build technology</span>
          <span>that moves businesses</span>
          <span className={styles.accent}>forward.</span>
        </motion.h1>

        <motion.p 
          className={styles.supportingText}
          style={{ opacity: subTextOpacity, y: subTextY }}
        >
          From product design and software development to growth and long-term support, ZeeTech helps ambitious businesses turn ideas into technology that works — and keeps getting better.
        </motion.p>

        <motion.div 
          className={styles.ctas}
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a href="#contact" className={styles.btnPrimary}>Start a conversation</a>
          <a href="#capabilities" className={styles.btnSecondary}>Explore our capabilities</a>
        </motion.div>

        <motion.div 
          className={styles.supportingLabel}
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          For startups, established businesses and international teams
        </motion.div>
      </div>

      <motion.div 
        className={styles.bottomStrip}
        style={{ opacity: stripOpacity }}
      >
        <div className={styles.stripLeft}>
          <span className={styles.stripLabel}>FIG. 01</span>
          <span className={styles.stripText}>The Zee signal — ambition in, working technology out.</span>
        </div>
        <div className={styles.stripCenter}>
          <span className={styles.scrollText}>Scroll to begin</span>
          <motion.div 
            className={styles.scrollIndicator}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className={styles.stripRight}>
          <span className={styles.stripLabel}>23.8° N — 90.4° E</span>
          <span className={styles.stripText}>Dhaka · Worldwide</span>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroClient() {
  return (
    <ScrollScene id="hero" trackHeight="220vh">
      {(progress) => <HeroSceneContent progress={progress} />}
    </ScrollScene>
  );
}

export default HeroClient;
