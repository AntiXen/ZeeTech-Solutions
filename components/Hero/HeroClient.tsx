'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';
import SectionLabel from '@/components/shared/SectionLabel/SectionLabel';
import SignalCanvas from '@/components/Signal/SignalCanvas';

export function HeroClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      <SignalCanvas scrollProgress={scrollYProgress} />
      
      <motion.div 
        className={styles.contentContainer}
        style={{ opacity, y }}
      >
        <div className={styles.topArea}>
          <SectionLabel number="01" text="STRATEGIC TECHNOLOGY PARTNER" />
        </div>

        <h1 className={styles.headline}>
          We build technology<br />
          that moves businesses<br />
          <span className={styles.accent}>forward.</span>
        </h1>

        <p className={styles.supportingText}>
          From product design and software development to growth and long-term support, ZeeTech helps ambitious businesses turn ideas into technology that works — and keeps getting better.
        </p>

        <div className={styles.ctas}>
          <a href="#contact" className={styles.btnPrimary}>Start a conversation</a>
          <a href="#capabilities" className={styles.btnSecondary}>Explore our capabilities</a>
        </div>

        <div className={styles.supportingLabel}>
          For startups, established businesses and international teams
        </div>
      </motion.div>

      <div className={styles.bottomStrip}>
        <div className={styles.stripLeft}>
          <span className={styles.stripLabel}>FIG. 01</span>
          <span className={styles.stripText}>The Zee signal — ambition in, working technology out.</span>
        </div>
        <div className={styles.stripCenter}>
          <span className={styles.scrollText}>Scroll</span>
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
      </div>
    </div>
  );
}
