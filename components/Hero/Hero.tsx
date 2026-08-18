'use client';

import React, { useState, useEffect } from 'react';
import { motion, useTransform, MotionValue, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';
import SectionLabel from '@/components/shared/SectionLabel/SectionLabel';
import SignalCanvas from '@/components/Signal/SignalCanvas';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';

const LINE_1 = 'We build technology';
const LINE_2 = 'that moves businesses';
const LINE_3 = 'forward.';

function TypewriterHeadline() {
  const prefersReduced = useReducedMotion();
  const [typed1, setTyped1] = useState(prefersReduced ? LINE_1 : '');
  const [typed2, setTyped2] = useState(prefersReduced ? LINE_2 : '');
  const [typed3, setTyped3] = useState(prefersReduced ? LINE_3 : '');
  const [activeLine, setActiveLine] = useState<1 | 2 | 3 | 'done'>(prefersReduced ? 'done' : 1);

  useEffect(() => {
    if (prefersReduced) return;

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    const runLoop = () => {
      let charIndex = 0;

      // Type Line 1
      const typeLine1 = () => {
        if (isCancelled) return;
        if (charIndex < LINE_1.length) {
          setTyped1(LINE_1.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeLine1, 35 + Math.random() * 20);
        } else {
          timeoutId = setTimeout(() => {
            setActiveLine(2);
            charIndex = 0;
            typeLine2();
          }, 100);
        }
      };

      // Type Line 2
      const typeLine2 = () => {
        if (isCancelled) return;
        if (charIndex < LINE_2.length) {
          setTyped2(LINE_2.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeLine2, 35 + Math.random() * 20);
        } else {
          timeoutId = setTimeout(() => {
            setActiveLine(3);
            charIndex = 0;
            typeLine3();
          }, 120);
        }
      };

      // Type Line 3 ("forward.")
      const typeLine3 = () => {
        if (isCancelled) return;
        if (charIndex < LINE_3.length) {
          setTyped3(LINE_3.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeLine3, 40 + Math.random() * 25);
        } else {
          setActiveLine('done');
          // Hold completed state for 2.8 seconds, then backspace
          timeoutId = setTimeout(startBackspace, 2800);
        }
      };

      // Backspace Line 3
      const startBackspace = () => {
        if (isCancelled) return;
        setActiveLine(3);
        let idx = LINE_3.length;
        const deleteLine3 = () => {
          if (isCancelled) return;
          if (idx > 0) {
            setTyped3(LINE_3.slice(0, idx - 1));
            idx--;
            timeoutId = setTimeout(deleteLine3, 20);
          } else {
            setActiveLine(2);
            let idx2 = LINE_2.length;
            const deleteLine2 = () => {
              if (isCancelled) return;
              if (idx2 > 0) {
                setTyped2(LINE_2.slice(0, idx2 - 1));
                idx2--;
                timeoutId = setTimeout(deleteLine2, 18);
              } else {
                setActiveLine(1);
                let idx1 = LINE_1.length;
                const deleteLine1 = () => {
                  if (isCancelled) return;
                  if (idx1 > 0) {
                    setTyped1(LINE_1.slice(0, idx1 - 1));
                    idx1--;
                    timeoutId = setTimeout(deleteLine1, 16);
                  } else {
                    // Small pause before typing again
                    timeoutId = setTimeout(runLoop, 400);
                  }
                };
                deleteLine1();
              }
            };
            deleteLine2();
          }
        };
        deleteLine3();
      };

      typeLine1();
    };

    timeoutId = setTimeout(runLoop, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [prefersReduced]);

  return (
    <h1 className={styles.headline}>
      <span className={styles.headlineLine}>
        {typed1}
        {activeLine === 1 && (
          <motion.span 
            className={styles.cursor}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </span>
      <span className={styles.headlineLine}>
        {typed2}
        {activeLine === 2 && (
          <motion.span 
            className={styles.cursor}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </span>
      <span className={`${styles.headlineLine} ${styles.accent}`}>
        {typed3}
        {(activeLine === 3 || activeLine === 'done') && (
          <motion.span 
            className={styles.cursor}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </span>
    </h1>
  );
}

function HeroSceneContent({ progress }: { progress: MotionValue<number> }) {
  const contentOpacity = useTransform(progress, [0, 0.65, 1], [1, 1, 0]);
  const contentY = useTransform(progress, [0, 0.65, 1], [0, 0, -35]);
  const headlineScale = useTransform(progress, [0, 0.65, 1], [1, 1, 0.96]);

  return (
    <div className={styles.sceneContainer}>
      <SignalCanvas />

      <motion.div 
        className={styles.contentWrapper}
        style={{ opacity: contentOpacity, y: contentY, scale: headlineScale }}
      >
        <div className={styles.topArea}>
          <SectionLabel number="01" text="STRATEGIC TECHNOLOGY PARTNER" />
        </div>

        <TypewriterHeadline />

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

      <motion.div 
        className={styles.bottomStrip}
        style={{ opacity: contentOpacity }}
      >
        <div className={styles.stripLeft}>
          <span className={styles.stripLabel}>FIG. 01</span>
          <span className={styles.stripText}>The Zee signal — ambition in, working technology out.</span>
        </div>

        <div className={styles.stripCenter}>
          <span className={styles.scrollText}>SCROLL</span>
          <motion.div 
            className={styles.scrollIndicator}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
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

export default function Hero() {
  return (
    <PinnedScene id="hero" trackHeight="180vh">
      {(progress) => <HeroSceneContent progress={progress} />}
    </PinnedScene>
  );
}
