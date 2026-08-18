'use client';

import React, { useState } from 'react';
import { motion, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion';
import styles from './Capabilities.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';
import TypewriterText from '@/components/shared/TypewriterText/TypewriterText';

interface Chapter {
  num: string;
  discipline: string;
  subtitle: string;
  description: string;
  services: string[];
}

const chapters: Chapter[] = [
  {
    num: '01',
    discipline: 'Design',
    subtitle: 'Shape the experience.',
    description: 'Every product starts as a question. We research the market, map the user journey and shape an experience that feels inevitable — then test it before a line of code is written.',
    services: [
      'UI/UX Design', 'Product Design', 'UX Research', 'Wireframing', 
      'Prototyping', 'Design Systems', 'Product Strategy', 'Experience Optimization'
    ]
  },
  {
    num: '02',
    discipline: 'Development',
    subtitle: 'Build the technology.',
    description: 'We build web, mobile and backend systems with the discipline of an engineering team — clean architecture, tested code and honest timelines. If it ships, we stand behind it.',
    services: [
      'Web Applications', 'Mobile Applications', 'SaaS Products', 'Custom Software', 
      'MVP Development', 'AI & Integration', 'API Development', 'Cloud Solutions', 
      'Enterprise Systems', 'CRM & ERP', 'Fintech Platforms', 'E-commerce', 
      'Automation Systems', 'Scalable Backends'
    ]
  },
  {
    num: '03',
    discipline: 'Growth',
    subtitle: 'Create momentum.',
    description: 'Shipping is the beginning, not the end. We help products find their market, turn visitors into customers and compound growth over time — with measurement, not guesswork.',
    services: [
      'Digital Marketing', 'SEO', 'Performance Marketing', 'Content Strategy', 
      'Conversion Optimization', 'Product Growth', 'Analytics', 'Growth Strategy'
    ]
  },
  {
    num: '04',
    discipline: 'Care',
    subtitle: 'Keep it evolving.',
    description: 'Software needs attention after launch. We monitor, maintain and improve what we build — so it stays fast, secure and relevant as your business changes.',
    services: [
      'Maintenance', 'Technical Support', 'Security Updates', 'Performance Optimization', 
      'Monitoring', 'Bug Fixing', 'Feature Development', 'Infrastructure Management', 
      'Continuous Development'
    ]
  }
];

function CapabilitiesSceneContent({ progress }: { progress: MotionValue<number> }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor1 = useTransform(
    progress,
    [0.05, 0.35],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );
  const accentColor2 = useTransform(
    progress,
    [0.25, 0.6],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  useMotionValueEvent(progress, 'change', (latest) => {
    let current = 0;
    if (latest < 0.25) current = 0;
    else if (latest < 0.5) current = 1;
    else if (latest < 0.75) current = 2;
    else current = 3;

    if (current !== activeChapter) {
      setActiveChapter(current);
    }
  });

  const currentData = chapters[activeChapter];
  const isTwoCol = currentData.services.length > 8;

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.label}>
            <span className={styles.accent}>03</span> — CAPABILITIES
          </span>
          <h2 className={styles.headline}>
            From <motion.span style={{ color: accentColor1 }}>first idea</motion.span> to <motion.span style={{ color: accentColor2 }}>long-term growth.</motion.span>
          </h2>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.indicatorCol}>
            {chapters.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.indicatorDot} ${i === activeChapter ? styles.indicatorDotActive : ''}`}
              />
            ))}
          </div>

          <div className={styles.leftCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${activeChapter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.chapterNumber}>{currentData.num}</div>
                <h3 className={styles.chapterHeading}>
                  {currentData.discipline}{' '}
                  <span className={styles.chapterSubtitle}>
                    —{' '}
                    <TypewriterText
                      key={currentData.subtitle}
                      text={currentData.subtitle}
                      speed={28}
                      delay={100}
                      loop={false}
                      showCursor={true}
                    />
                  </span>
                </h3>
                <p className={styles.chapterDescription}>{currentData.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.rightCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeChapter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={isTwoCol ? styles.serviceListTwoCol : styles.serviceList}
              >
                {currentData.services.map((service, idx) => (
                  <div key={idx} className={styles.serviceItem}>
                    <span className={styles.serviceArrow}>→</span>
                    <span className={styles.serviceName}>{service}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="capabilities" trackHeight="240vh">
      {(progress) => <CapabilitiesSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
