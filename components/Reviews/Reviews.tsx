'use client';

import React, { useState } from 'react';
import { motion, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion';
import styles from './Reviews.module.css';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

interface Review {
  number: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  location: string;
  quote: string;
  keyMetric: string;
  projectAssociation: string;
  projectScope: string;
}

const reviews: Review[] = [
  {
    number: '01',
    clientName: 'Marcus Vance',
    clientTitle: 'Chief Technology Officer',
    clientCompany: 'Meridian Payments Group',
    location: 'London · Global',
    quote:
      'ZeeTech didn’t just write code — they challenged our architectural assumptions, eliminated months of technical debt, and built a payment infrastructure that processes millions with sub-50ms latency.',
    keyMetric: '4× Throughput · Sub-50ms Latency',
    projectAssociation: '01 MERIDIAN',
    projectScope: 'Event-Driven Financial Architecture & Core Platform'
  },
  {
    number: '02',
    clientName: 'Sarah Jenkins',
    clientTitle: 'VP of Operations',
    clientCompany: 'FieldOS Logistics',
    location: 'Austin, TX · USA',
    quote:
      'Before ZeeTech, our dispatch and field teams were trapped in disconnected spreadsheets and chat groups. They delivered a unified web and mobile platform that cut our coordination overhead in half.',
    keyMetric: '50% Overhead Reduction · Real-time Fleet Sync',
    projectAssociation: '02 FIELDOS',
    projectScope: 'Real-Time Dispatch Engine & Offline-First Mobile Suite'
  },
  {
    number: '03',
    clientName: 'David Lindqvist',
    clientTitle: 'Managing Director',
    clientCompany: 'Northstar Distribution',
    location: 'Stockholm · Sweden',
    quote:
      'The team’s ability to grasp complex distributor pricing models and translate them into a frictionless digital commerce storefront was exceptional. They think and execute like true technical co-founders.',
    keyMetric: 'Automated ERP Sync · Multi-Tier Catalogues',
    projectAssociation: '03 NORTHSTAR',
    projectScope: 'Enterprise B2B Commerce Platform & ERP Integration'
  }
];

function ReviewsSceneContent({ progress }: { progress: MotionValue<number> }) {
  const [activeReview, setActiveReview] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = useTransform(
    progress,
    [0.08, 0.4],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  useMotionValueEvent(progress, 'change', (latest) => {
    let reviewIdx = 0;
    if (latest < 0.333) {
      reviewIdx = 0;
    } else if (latest < 0.666) {
      reviewIdx = 1;
    } else {
      reviewIdx = 2;
    }

    if (reviewIdx !== activeReview) {
      setActiveReview(reviewIdx);
    }
  });

  const currentReview = reviews[activeReview];

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.label}>
              <span className={styles.accent}>09</span> — CLIENT PERSPECTIVES
            </span>
            <h2 className={styles.headline}>
              Conviction in the thinking. <motion.span style={{ color: accentColor }}>Proven in production.</motion.span>
            </h2>
          </div>

          <div className={styles.reviewPills}>
            {reviews.map((r, i) => (
              <button
                key={`${r.number}-${theme}`}
                onClick={() => setActiveReview(i)}
                className={`${styles.reviewPill} ${i === activeReview ? styles.reviewPillActive : ''}`}
              >
                {r.projectAssociation}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Testimonial Stage */}
        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`review-${activeReview}-${theme}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={styles.reviewCard}
            >
              {/* Left: Editorial Quote & Outcome Tag */}
              <div className={styles.quoteArea}>
                <div className={styles.quoteHeader}>
                  <div className={styles.verifiedBadge}>
                    <span className={styles.verifiedDot} /> Verified Client Outcome
                  </div>
                </div>

                <blockquote className={styles.quoteText}>
                  &ldquo;{currentReview.quote}&rdquo;
                </blockquote>

                <div className={styles.metricStrip}>
                  <span className={styles.metricTag}>
                    <span className={styles.metricTagAccent}>Outcome Impact:</span> {currentReview.keyMetric}
                  </span>
                </div>
              </div>

              {/* Right: Client Executive Profile & Project Scope */}
              <div className={styles.profileArea}>
                <div className={styles.authorBlock}>
                  <span className={styles.authorRoleTag}>Leadership Endorsement</span>
                  <h3 className={styles.authorName}>{currentReview.clientName}</h3>
                  <div className={styles.authorTitle}>
                    {currentReview.clientTitle}, {currentReview.clientCompany}
                  </div>
                  <div className={styles.authorLocation}>{currentReview.location}</div>
                </div>

                <div className={styles.projectContext}>
                  <span className={styles.contextLabel}>Delivered Solution</span>
                  <div className={styles.contextValue}>{currentReview.projectAssociation}</div>
                  <div className={styles.contextScope}>{currentReview.projectScope}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="reviews" trackHeight="200vh">
      {(progress) => <ReviewsSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
