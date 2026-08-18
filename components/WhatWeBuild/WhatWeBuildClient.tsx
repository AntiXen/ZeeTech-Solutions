'use client';

import React, { useState } from 'react';
import { motion, useMotionValueEvent, AnimatePresence, MotionValue, useTransform } from 'framer-motion';
import styles from './WhatWeBuild.module.css';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

interface CatalogItem {
  id: string;
  name: string;
  desc: string;
}

interface Category {
  letter: string;
  title: string;
  items: CatalogItem[];
}

const categories: Category[] = [
  {
    letter: 'A',
    title: 'Products',
    items: [
      { id: '1.1', name: 'SaaS Platforms', desc: 'Multi-tenant products engineered to scale with the business.' },
      { id: '1.2', name: 'Web Applications', desc: 'Responsive, fast, accessible interfaces built for real users.' },
      { id: '1.3', name: 'Mobile Apps', desc: 'Cross-platform and native applications that work beautifully on every device.' },
      { id: '1.4', name: 'MVPs', desc: 'Focused first versions designed to learn fast and iterate faster.' },
      { id: '1.5', name: 'E-commerce', desc: 'Online retail systems built around conversion, speed and reliability.' },
      { id: '1.6', name: 'Custom Software', desc: 'Purpose-built tools that solve the problems off-the-shelf software can’t.' }
    ]
  },
  {
    letter: 'B',
    title: 'Systems',
    items: [
      { id: '2.1', name: 'CRM Systems', desc: 'Customer relationship platforms tailored to how your team actually works.' },
      { id: '2.2', name: 'ERP Systems', desc: 'Enterprise resource management that connects operations end to end.' },
      { id: '2.3', name: 'Fintech Platforms', desc: 'Financial technology with the compliance, security and precision required.' },
      { id: '2.4', name: 'Automation Systems', desc: 'Workflow automation that removes repetitive work and reduces human error.' },
      { id: '2.5', name: 'Enterprise Platforms', desc: 'Large-scale systems built to handle complexity, compliance and growth.' }
    ]
  },
  {
    letter: 'C',
    title: 'Infrastructure',
    items: [
      { id: '3.1', name: 'AI Systems', desc: 'Machine learning and AI integration that creates measurable value, not buzz.' },
      { id: '3.2', name: 'Cloud Infrastructure', desc: 'Scalable, secure cloud architecture on AWS, Azure or modern platforms.' },
      { id: '3.3', name: 'APIs & Integrations', desc: 'Clean, documented interfaces that connect systems and enable ecosystems.' },
      { id: '3.4', name: 'Modern Databases', desc: 'Data architecture designed for performance, integrity and future scale.' }
    ]
  }
];

function WhatWeBuildSceneContent({ progress }: { progress: MotionValue<number> }) {
  const [activeCategory, setActiveCategory] = useState(0);

  useMotionValueEvent(progress, 'change', (latest) => {
    let current = 0;
    if (latest < 0.33) current = 0;
    else if (latest < 0.66) current = 1;
    else current = 2;

    if (current !== activeCategory) {
      setActiveCategory(current);
    }
  });

  const sceneOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0, 0.08, 0.92, 1], [25, 0, 0, -25]);

  const currentCategory = categories[activeCategory];

  return (
    <motion.div 
      className={styles.sceneViewport}
      style={{ opacity: sceneOpacity, y: sceneY }}
    >
      <div className={styles.container}>
        <div className={styles.topArea}>
          <div>
            <span className={styles.label}>
              <span className={styles.accent}>04</span> — WHAT WE BUILD
            </span>
            <h2 className={styles.headline}>
              Complex problems deserve <span className={styles.accent}>thoughtful technology</span>.
            </h2>
          </div>

          <div className={styles.categoryNav}>
            {categories.map((cat, i) => (
              <button
                key={cat.letter}
                onClick={() => setActiveCategory(i)}
                className={`${styles.catTab} ${i === activeCategory ? styles.catTabActive : ''}`}
              >
                <span className={styles.catTabLetter}>{cat.letter}</span>
                <span className={styles.catTabTitle}>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`category-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={styles.categoryContent}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.bigLetter}>{currentCategory.letter}</span>
                <div className={styles.categoryHeaderMeta}>
                  <span className={styles.categorySubtitle}>CATEGORY {currentCategory.letter}</span>
                  <h3 className={styles.categoryTitle}>{currentCategory.title}</h3>
                </div>
              </div>

              <div className={styles.itemsGrid}>
                {currentCategory.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.itemId}>{item.id}</div>
                    <div className={styles.itemText}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemDesc}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.bottomNote}>
          If it involves software, we’ve likely built something like it — and when we haven’t, we’ll tell you honestly before we start.
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatWeBuildClient() {
  return (
    <ScrollScene id="build" trackHeight="250vh">
      {(progress) => <WhatWeBuildSceneContent progress={progress} />}
    </ScrollScene>
  );
}
