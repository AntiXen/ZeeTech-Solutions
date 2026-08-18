'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Founder.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';
import TypewriterText from '@/components/shared/TypewriterText/TypewriterText';

const CEO_IMAGE_URL = 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/CEO%20AMIT.png';
const QUOTE_TEXT = 'Everyone understands what, but a very few understand why!';

function FounderSceneContent({ progress }: { progress: MotionValue<number> }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = useTransform(
    progress,
    [0.08, 0.4],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );
  
  const quoteColor = useTransform(
    progress,
    [0.1, 0.45],
    [isDark ? '#777777' : '#71717A', isDark ? '#FFFFFF' : '#0A0A0C']
  );
  
  const accentGlow = useTransform(
    progress,
    [0.1, 0.45],
    ['0 0 0px transparent', isDark ? '0 0 24px rgba(34,197,94,0.3)' : '0 0 24px rgba(255,85,0,0.22)']
  );
  
  const portraitScale = useTransform(progress, [0, 1], [0.98, 1.02]);

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Titles & Texts */}
          <div className={styles.textCol}>
            <div className={styles.topArea}>
              <span className={styles.label}>
                <span className={styles.accent}>07</span> — LEADERSHIP
              </span>
              <h2 className={styles.headline}>
                Technology built with discipline. <motion.span style={{ color: accentColor }}>Led with clarity.</motion.span>
              </h2>
            </div>

            <motion.blockquote className={styles.quoteBlock} style={{ boxShadow: accentGlow }}>
              <motion.p className={styles.quoteText} style={{ color: quoteColor }}>
                &ldquo;
                <TypewriterText
                  text={QUOTE_TEXT}
                  speed={28}
                  delay={200}
                  loop={false}
                  showCursor={true}
                />
                &rdquo;
              </motion.p>
            </motion.blockquote>

            <div className={styles.philosophyText}>
              <p>
                Great software isn’t just about writing great code. It’s about understanding why you’re building it in the first place.
              </p>
              <p>
                Anyone who knows how to code can build software. But building the right software takes something more — understanding the vision, the business, and the people behind it.
              </p>
              <p>
                At ZeeTech, we don’t just take an idea and turn it into code. We challenge it, shape it, and make it better — so what we build doesn’t just work, but actually moves the business forward.
              </p>
            </div>
          </div>

          {/* Right Column: CEO Image & Card */}
          <div className={styles.imageCol}>
            <motion.div className={styles.portraitCard} style={{ scale: portraitScale }}>
              <div className={styles.portraitFrame}>
                <Image
                  src={CEO_IMAGE_URL}
                  alt="AMIT GHOSH — Founder and CEO, ZeeTech"
                  fill
                  className={styles.portraitImage}
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
                <div className={styles.cornerTL} />
                <div className={styles.cornerTR} />
                <div className={styles.cornerBL} />
                <div className={styles.cornerBR} />
              </div>

              <div className={styles.founderMeta}>
                <div className={styles.founderName}>AMIT GHOSH</div>
                <div className={styles.founderTitle}>Founder and CEO, ZeeTech</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Founder() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="about" trackHeight="180vh">
      {(progress) => <FounderSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
