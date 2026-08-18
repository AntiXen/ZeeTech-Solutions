'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion';
import styles from './SelectedWork.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

interface Project {
  number: string;
  name: string;
  industry: string;
  overview: string;
  challenge: string;
  solution: string;
  technology: string;
  outcome: string;
  value: string;
  contribution: string;
  images: {
    url: string;
    caption: string;
  }[];
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Meridian',
    industry: 'Enterprise FinTech / Payments Infrastructure',
    overview:
      'A scalable financial infrastructure engineered around an event-driven microservices architecture to process high-volume transactions and automated reconciliation with sub-50ms latency.',
    challenge:
      'The client had outgrown its legacy transaction platform — high transaction loads and manual reconciliation were creating operational bottlenecks and slowing down new product launches.',
    solution:
      'ZeeTech rebuilt the core system with event-driven services, transaction orchestration, automated reconciliation workflows, comprehensive observability, and real-time audit trails.',
    outcome:
      'Capable of supporting significantly higher transaction volumes while reducing operational complexity and providing a resilient base for future products.',
    value: '$75K–$120K+',
    technology: 'React · Next.js · TypeScript · Node.js · PostgreSQL · Redis · AWS · Docker · Kubernetes · Event-Driven Architecture',
    contribution: 'Product Strategy · Architecture · UX Research · Full-Stack Engineering · Cloud DevOps',
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_case_study_presentation.png',
        caption: 'System Architecture & Flow'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_accounts_reporting.png',
        caption: 'Accounts & Reporting'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_reconciliation_operations.png',
        caption: 'Reconciliation Operations'
      }
    ]
  },
  {
    number: '02',
    name: 'FieldOS',
    industry: 'Operations Management / B2B SaaS',
    overview:
      'A unified operations platform connecting management, dispatch, field technicians, and customers into a synchronized real-time workflow across web and mobile.',
    challenge:
      'A growing logistics and field-service provider was managing operations across spreadsheets and disconnected chat apps, causing blind spots and high coordination overhead.',
    solution:
      'ZeeTech built a centralized dispatch and operations platform with real-time GPS fleet tracking, automated job assignment, customer status alerts, and an offline-first mobile app.',
    outcome:
      'Transformed fragmented operations into a connected digital workflow, reducing coordination time and enabling seamless multi-location expansion.',
    value: '$60K–$90K+',
    technology: 'Next.js · TypeScript · Node.js · PostgreSQL · Redis · Flutter · AWS · Maps & Location APIs · REST APIs',
    contribution: 'Discovery · Workflow Architecture · UX/UI Design · Web App · Mobile App · Backend Engineering',
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_case_study_presentation.png',
        caption: 'Platform Architecture'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_dispatch_map.png',
        caption: 'Real-Time Dispatch Map'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_operations_overview.png',
        caption: 'Operations Analytics'
      }
    ]
  },
  {
    number: '03',
    name: 'Northstar',
    industry: 'B2B Commerce / Digital Marketplace',
    overview:
      'A high-performance B2B digital commerce platform tailored for distributor sales, custom customer catalogues, tiered pricing, and ERP integration.',
    challenge:
      'Customers relied on phone calls and manual sales rep orders, while the internal team spent hours managing custom catalogues, pricing tiers, and inventory reconciliation.',
    solution:
      'ZeeTech built a modern B2B commerce experience with account-specific pricing, bulk ordering, fast re-order flows, and a modular integration layer connecting ERP and inventory data.',
    outcome:
      'A scalable digital sales channel handling thousands of SKUs and automated recurring orders, significantly accelerating order velocity.',
    value: '$50K–$80K+',
    technology: 'React · Next.js · TypeScript · Node.js · PostgreSQL · AWS · Headless Commerce · REST APIs · ERP Integrations',
    contribution: 'Commerce Strategy · Product Design · Design System · Full-Stack Integration · Optimization',
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_case_study_presentation.png',
        caption: 'Commerce Architecture'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_customer_storefront.png',
        caption: 'Customer Storefront'
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_commerce_operations.png',
        caption: 'Order Operations'
      }
    ]
  }
];

function SelectedWorkSceneContent({ progress }: { progress: MotionValue<number> }) {
  const [activeProject, setActiveProject] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = useTransform(
    progress,
    [0.08, 0.4],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  useMotionValueEvent(progress, 'change', (latest) => {
    let projectIdx = 0;
    if (latest < 0.333) {
      projectIdx = 0;
    } else if (latest < 0.666) {
      projectIdx = 1;
    } else {
      projectIdx = 2;
    }

    if (projectIdx !== activeProject) {
      setActiveProject(projectIdx);
    }
  });

  const currentProject = projects[activeProject];

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        {/* Section Header matching site-wide typography */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.label}>
              <span className={styles.accent}>05</span> — SELECTED WORK
            </span>
            <h2 className={styles.headline}>
              Built for real businesses. <motion.span style={{ color: accentColor }}>Designed for real outcomes.</motion.span>
            </h2>
          </div>

          <div className={styles.projectPills}>
            {projects.map((p, i) => (
              <button
                key={`${p.number}-${theme}`}
                onClick={() => setActiveProject(i)}
                className={`${styles.projectPill} ${i === activeProject ? styles.projectPillActive : ''}`}
              >
                {p.number} {p.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport-Fitted Project Card */}
        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`project-${activeProject}-${theme}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={styles.projectCard}
            >
              {/* Left: 3-Image Grid Layout */}
              <div className={styles.imageGridArea}>
                {/* Primary Banner Image */}
                <div className={styles.primaryImageWrapper}>
                  <Image
                    src={currentProject.images[0].url}
                    alt={`${currentProject.name} — ${currentProject.images[0].caption}`}
                    fill
                    className={styles.gridImg}
                    sizes="(max-width: 1024px) 100vw, 450px"
                    priority
                  />
                  <div className={styles.imageBadge}>
                    <span>{currentProject.images[0].caption}</span>
                  </div>
                </div>

                {/* Bottom 2 Side-by-Side Companion Images */}
                <div className={styles.subImagesRow}>
                  <div className={styles.subImageWrapper}>
                    <Image
                      src={currentProject.images[1].url}
                      alt={`${currentProject.name} — ${currentProject.images[1].caption}`}
                      fill
                      className={styles.gridImg}
                      sizes="(max-width: 1024px) 50vw, 220px"
                    />
                    <div className={styles.imageBadgeSmall}>
                      <span>{currentProject.images[1].caption}</span>
                    </div>
                  </div>

                  <div className={styles.subImageWrapper}>
                    <Image
                      src={currentProject.images[2].url}
                      alt={`${currentProject.name} — ${currentProject.images[2].caption}`}
                      fill
                      className={styles.gridImg}
                      sizes="(max-width: 1024px) 50vw, 220px"
                    />
                    <div className={styles.imageBadgeSmall}>
                      <span>{currentProject.images[2].caption}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Rich Structured Case Details */}
              <div className={styles.infoArea}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleRow}>
                    <span className={styles.cardNumber}>{currentProject.number}</span>
                    <h3 className={styles.cardTitle}>{currentProject.name}</h3>
                    <span className={styles.valueBadge}>{currentProject.value}</span>
                  </div>
                  <span className={styles.cardIndustry}>
                    <span className={styles.cardIndustryPrefix}>/</span>
                    {currentProject.industry}
                  </span>
                </div>

                <p className={styles.overviewText}>{currentProject.overview}</p>

                <div className={styles.divider} />

                <div className={styles.metaGrid}>
                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>THE CHALLENGE</span>
                    <p className={styles.metaText}>{currentProject.challenge}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>THE SOLUTION</span>
                    <p className={styles.metaText}>{currentProject.solution}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>THE OUTCOME</span>
                    <p className={styles.metaText}>{currentProject.outcome}</p>
                  </div>

                  <div className={styles.metaBlock}>
                    <span className={styles.metaLabel}>CONTRIBUTION</span>
                    <p className={styles.metaTech}>{currentProject.contribution}</p>
                  </div>

                  <div className={`${styles.metaBlock} ${styles.fullWidth}`}>
                    <span className={styles.metaLabel}>TECHNOLOGY</span>
                    <p className={styles.metaTech}>{currentProject.technology}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="work" trackHeight="200vh">
      {(progress) => <SelectedWorkSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
