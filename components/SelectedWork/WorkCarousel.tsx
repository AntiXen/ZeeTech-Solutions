'use client';

import React, { useState } from 'react';
import { motion, useMotionValueEvent, AnimatePresence, MotionValue, useTransform } from 'framer-motion';
import styles from './SelectedWork.module.css';
import ScrollScene from '@/components/shared/ScrollScene/ScrollScene';

interface Project {
  number: string;
  name: string;
  industry: string;
  challenge: string;
  solution: string;
  technology: string;
  outcome: string;
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Placeholder — replace',
    industry: '/ Enterprise FinTech',
    challenge: 'Describe the problem the client brought to ZeeTech — scaling multi-tenant architecture under heavy transaction load.',
    solution: 'Describe the thinking, design and technology we brought to it — event-driven cloud microservices with sub-50ms latency.',
    technology: 'React · Node.js · PostgreSQL · AWS',
    outcome: 'Document the result once the project has shipped — 4× increase in throughput with 99.99% uptime.'
  },
  {
    number: '02',
    name: 'Placeholder — replace',
    industry: '/ AI Healthcare Platform',
    challenge: 'Describe the problem the client brought to ZeeTech — automating complex clinical diagnostic workflows securely.',
    solution: 'Describe the thinking, design and technology we brought to it — HIPAA-compliant data pipelines and predictive ML inference.',
    technology: 'Next.js · Python · PyTorch · GCP',
    outcome: 'Document the result once the project has shipped — 65% reduction in report turnaround time.'
  },
  {
    number: '03',
    name: 'Placeholder — replace',
    industry: '/ Logistics & Global Supply',
    challenge: 'Describe the problem the client brought to ZeeTech — cross-border fleet tracking and automated customs reconciliation.',
    solution: 'Describe the thinking, design and technology we brought to it — offline-first mobile client and real-time event streaming.',
    technology: 'Flutter · Node.js · Redis · Docker',
    outcome: 'Document the result once the project has shipped — active tracking across 12 countries with zero sync failures.'
  }
];

function SelectedWorkSceneContent({ progress }: { progress: MotionValue<number> }) {
  const [activeProject, setActiveProject] = useState(0);

  useMotionValueEvent(progress, 'change', (latest) => {
    let current = 0;
    if (latest < 0.33) current = 0;
    else if (latest < 0.66) current = 1;
    else current = 2;

    if (current !== activeProject) {
      setActiveProject(current);
    }
  });

  const sceneOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0, 0.08, 0.92, 1], [25, 0, 0, -25]);

  const currentProject = projects[activeProject];

  return (
    <motion.div 
      className={styles.sceneViewport}
      style={{ opacity: sceneOpacity, y: sceneY }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>
              <span className={styles.accent}>05</span> — SELECTED WORK
            </span>
            <h2 className={styles.headline}>
              Built for real businesses. <span className={styles.accent}>Designed for real outcomes.</span>
            </h2>
          </div>

          <div className={styles.projectPills}>
            {projects.map((p, i) => (
              <button
                key={p.number}
                onClick={() => setActiveProject(i)}
                className={`${styles.projectPill} ${i === activeProject ? styles.projectPillActive : ''}`}
              >
                PROJECT {p.number}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`project-${activeProject}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={styles.projectCard}
            >
              {/* Left Visual Region */}
              <div className={styles.visualArea}>
                <div className={styles.visualWatermark}>{currentProject.number}</div>
                <div className={styles.visualGlow} />
                <div className={styles.visualTag}>FIG. 0{Number(currentProject.number) + 2} — CASE STUDY ARCHIVE</div>
              </div>

              {/* Right Details Region */}
              <div className={styles.infoArea}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>{currentProject.number}</span>
                  <h3 className={styles.cardTitle}>{currentProject.name}</h3>
                  <span className={styles.cardIndustry}>{currentProject.industry}</span>
                </div>

                <div className={styles.divider} />

                <div className={styles.metaGrid}>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>CHALLENGE</span>
                    <p className={styles.metaText}>{currentProject.challenge}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>SOLUTION</span>
                    <p className={styles.metaText}>{currentProject.solution}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>OUTCOME</span>
                    <p className={styles.metaText}>{currentProject.outcome}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>TECHNOLOGY</span>
                    <p className={styles.metaTech}>{currentProject.technology}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkCarousel() {
  return (
    <ScrollScene id="work" trackHeight="260vh">
      {(progress) => <SelectedWorkSceneContent progress={progress} />}
    </ScrollScene>
  );
}
