'use client';

import React, { useState } from 'react';
import { motion, useMotionValueEvent, AnimatePresence, MotionValue, useTransform } from 'framer-motion';
import styles from './Capabilities.module.css';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

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

  const sceneOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0, 0.08, 0.92, 1], [25, 0, 0, -25]);

  const currentData = chapters[activeChapter];
  const isTwoCol = currentData.services.length > 8;

  return (
    <motion.div 
      className={styles.sceneViewport}
      style={{ opacity: sceneOpacity, y: sceneY }}
    >
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <span className={styles.label}>
            <span className={styles.accent}>03</span> — CAPABILITIES
          </span>
          <h2 className={styles.headline}>
            From <span className={styles.accent}>first idea</span> to long-term growth.
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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.chapterNumber}>{currentData.num}</div>
                <h3 className={styles.chapterHeading}>
                  {currentData.discipline} <span className={styles.chapterSubtitle}>— {currentData.subtitle}</span>
                </h3>
                <p className={styles.chapterDescription}>{currentData.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.rightCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeChapter}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
    </motion.div>
  );
}

export default function CapabilitiesClient() {
  return (
    <ScrollScene id="capabilities" trackHeight="300vh">
      {(progress) => <CapabilitiesSceneContent progress={progress} />}
    </ScrollScene>
  );
}
