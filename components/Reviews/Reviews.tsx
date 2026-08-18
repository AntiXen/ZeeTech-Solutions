'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, CheckCircle2, Star, Building2, MapPin, TrendingUp } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './Reviews.module.css';

interface Review {
  id: string;
  number: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  location: string;
  quote: string;
  keyMetric: string;
  metricLabel: string;
  projectAssociation: string;
  projectScope: string;
  stars: number;
}

const reviews: Review[] = [
  {
    id: 'meridian',
    number: '01',
    clientName: 'Marcus Vance',
    clientTitle: 'Chief Technology Officer',
    clientCompany: 'Meridian Payments Group',
    location: 'London · Global Deployment',
    quote:
      'ZeeTech didn’t just write code — they challenged our architectural assumptions, eliminated months of technical debt, and built a payment infrastructure that processes millions with sub-50ms latency.',
    keyMetric: '4× Scale · Sub-50ms Latency',
    metricLabel: 'Transaction Capacity & Speed',
    projectAssociation: '01 MERIDIAN',
    projectScope: 'Event-Driven Financial Microservices & Core Platform',
    stars: 5,
  },
  {
    id: 'fieldos',
    number: '02',
    clientName: 'Sarah Jenkins',
    clientTitle: 'VP of Operations',
    clientCompany: 'FieldOS Logistics',
    location: 'Austin, TX · North America',
    quote:
      'Before ZeeTech, our dispatch and field teams were trapped in disconnected spreadsheets and chat groups. They delivered a unified web and mobile platform that cut our coordination overhead in half.',
    keyMetric: '50% Overhead Reduction · 96.8% On-Time',
    metricLabel: 'Dispatch Efficiency & Fleet Sync',
    projectAssociation: '02 FIELDOS',
    projectScope: 'Real-Time Dispatch Engine & Offline-First Mobile Suite',
    stars: 5,
  },
  {
    id: 'northstar',
    number: '03',
    clientName: 'David Lindqvist',
    clientTitle: 'Managing Director',
    clientCompany: 'Northstar Distribution',
    location: 'Stockholm · Nordic Region',
    quote:
      'The team’s ability to grasp complex distributor pricing models and translate them into a frictionless digital commerce storefront was exceptional. They think and execute like true technical co-founders.',
    keyMetric: '+140% Digital Reorders · 50K+ SKUs',
    metricLabel: 'Commerce Velocity & Volume',
    projectAssociation: '03 NORTHSTAR',
    projectScope: 'Enterprise B2B Commerce Platform & ERP Integration',
    stars: 5,
  },
];

export default function Reviews() {
  const [activeReview, setActiveReview] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = reviews[activeReview];

  return (
    <section id="reviews" ref={sectionRef} className={`section ${styles.reviewsSection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div>
            <div className="label-eyebrow">
              <span className="label-dot" />
              <span>09 — CLIENT PERSPECTIVES</span>
            </div>
            <h2 className={styles.headline}>
              Conviction in the architecture.{' '}
              <span className={styles.accentText}>Proven by executives.</span>
            </h2>
          </div>

          {/* Project Switcher Pills */}
          <div className={styles.reviewPills}>
            {reviews.map((r, idx) => {
              const isActive = idx === activeReview;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveReview(idx)}
                  className={`${styles.reviewPill} ${isActive ? styles.reviewPillActive : ''}`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span>{r.projectAssociation}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeReviewIndicator"
                      className={styles.activePillGlow}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Testimonial Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={styles.reviewCard}
          >
            {/* Left: Editorial Quote & Outcome */}
            <div className={styles.quoteCol}>
              <div className={styles.cardTop}>
                <div className={styles.verifiedTag}>
                  <CheckCircle2 size={15} className={styles.verifiedIcon} />
                  <span>Verified Executive Endorsement</span>
                </div>
                <div className={styles.starsRow}>
                  {[...Array(current.stars)].map((_, i) => (
                    <Star key={i} size={15} className={styles.starIcon} fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className={styles.quoteBody}>
                <Quote size={28} className={styles.quoteGlyph} />
                <blockquote className={styles.quoteText}>
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              <div className={styles.outcomeImpactBox}>
                <div className={styles.impactIcon}>
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className={styles.impactValue}>{current.keyMetric}</div>
                  <div className={styles.impactLabel}>{current.metricLabel}</div>
                </div>
              </div>
            </div>

            {/* Right: Executive Identity & Project Context */}
            <div className={styles.identityCol}>
              <div className={styles.authorBlock}>
                <span className={styles.authorBadge}>EXECUTIVE SPONSOR</span>
                <h3 className={styles.authorName}>{current.clientName}</h3>
                <p className={styles.authorTitle}>{current.clientTitle}</p>
                <div className={styles.companyRow}>
                  <Building2 size={15} className={styles.metaIcon} />
                  <span>{current.clientCompany}</span>
                </div>
                <div className={styles.locationRow}>
                  <MapPin size={15} className={styles.metaIcon} />
                  <span>{current.location}</span>
                </div>
              </div>

              <div className={styles.projectContext}>
                <div className={styles.contextHeader}>DELIVERED SYSTEM ARCHITECTURE</div>
                <div className={styles.contextProject}>{current.projectAssociation}</div>
                <p className={styles.contextScope}>{current.projectScope}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
