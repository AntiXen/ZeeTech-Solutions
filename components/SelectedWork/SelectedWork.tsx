'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './SelectedWork.module.css';

interface Project {
  number: string;
  name: string;
  industry: string;
  clientLocation: string;
  headline: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  technology: string[];
  contribution: string[];
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
    clientLocation: 'London, UK · Global Deployment',
    headline: 'High-volume transaction orchestration and automated multi-currency reconciliation engine.',
    overview:
      'A resilient financial infrastructure engineered around event-driven microservices to process high-volume payment batches with sub-50ms latency and zero transaction drops.',
    challenge:
      'The client had outgrown its legacy monolithic transaction engine — high peak volumes and manual reconciliation created operational bottlenecks and delayed new enterprise merchant onboarding.',
    solution:
      'ZeeTech rebuilt the core system with event-driven Go and Node services, real-time ledger orchestration, automated reconciliation pipelines, comprehensive distributed tracing, and immutable audit trails.',
    outcome:
      'Increased system throughput by 4×, reduced reconciliation cycle time from 6 hours to under 4 minutes, and provided a rock-solid platform for global expansion.',
    metrics: [
      { label: 'System Throughput', value: '4× Scale' },
      { label: 'Reconciliation Latency', value: '< 4 Mins' },
      { label: 'API Response Time', value: 'Sub-50ms' },
    ],
    technology: ['Next.js', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Kafka'],
    contribution: ['Product Strategy', 'System Architecture', 'UX Research', 'Full-Stack Engineering', 'Cloud DevOps'],
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_case_study_presentation.png',
        caption: 'System Architecture & Flow Overview',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_accounts_reporting.png',
        caption: 'Accounts & Real-Time Reporting',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_reconciliation_operations.png',
        caption: 'Reconciliation Operations Hub',
      },
    ],
  },
  {
    number: '02',
    name: 'FieldOS',
    industry: 'Operations Management / B2B Logistics SaaS',
    clientLocation: 'Austin, TX · North America',
    headline: 'Unified operations engine connecting dispatch, field technicians, and customers in real time.',
    overview:
      'A mission-critical operations ecosystem unifying dispatch command, live GPS fleet tracking, automated job routing, and an offline-first mobile app for field engineers.',
    challenge:
      'A rapidly growing logistics and field-service company was managing dispatch across disconnected spreadsheets and chat groups, leading to dispatch blind spots and severe coordination overhead.',
    solution:
      'ZeeTech built a centralized web dispatch command center synchronized with offline-capable Flutter mobile apps, automated schedule optimization, and real-time customer SMS telemetry.',
    outcome:
      'Reduced daily coordination overhead by 50%, increased on-time job arrival rates to 96.8%, and enabled seamless operational expansion across 14 new cities.',
    metrics: [
      { label: 'Coordination Overhead', value: '-50%' },
      { label: 'On-Time Arrival Rate', value: '96.8%' },
      { label: 'Multi-City Scale', value: '14 Hubs' },
    ],
    technology: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Flutter', 'AWS', 'Mapbox APIs', 'WebSockets'],
    contribution: ['Discovery & Workflow Mapping', 'UI/UX Design', 'Web Dispatch App', 'Mobile App Suite', 'Backend Engineering'],
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_case_study_presentation.png',
        caption: 'Platform Architecture & Dispatch Engine',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_dispatch_map.png',
        caption: 'Live Real-Time Dispatch Fleet Map',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/fieldos_operations_overview.png',
        caption: 'Operations Analytics & Performance',
      },
    ],
  },
  {
    number: '03',
    name: 'Northstar',
    industry: 'B2B Digital Commerce / Wholesale Marketplace',
    clientLocation: 'Stockholm · Nordic Distribution',
    headline: 'High-performance B2B digital commerce tailored for custom distributor pricing and ERP sync.',
    overview:
      'A headless B2B commerce platform built for high-velocity industrial distribution, featuring customer-specific pricing matrixes, bulk ordering workflows, and automated ERP inventory synchronization.',
    challenge:
      'Wholesale customers were burdened with phone calls and manual sales rep orders, while internal staff spent hours manually re-keying orders and updating inventory levels across legacy systems.',
    solution:
      'ZeeTech engineered a custom headless storefront with sub-second catalogue search across 50,000+ SKUs, tiered pricing rules, instant 1-click reordering, and a bi-directional ERP sync layer.',
    outcome:
      'Accelerated order placement velocity by 65%, increased digital reorder volume by 140%, and eliminated thousands of hours of manual sales administrative friction.',
    metrics: [
      { label: 'Order Velocity', value: '+65%' },
      { label: 'Digital Reorders', value: '+140%' },
      { label: 'Catalogue Capacity', value: '50K+ SKUs' },
    ],
    technology: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Headless Commerce', 'ERP APIs'],
    contribution: ['Commerce Strategy', 'Design System', 'Headless Architecture', 'Full-Stack Integration', 'Performance Tuning'],
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_case_study_presentation.png',
        caption: 'Commerce Architecture & Integration',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_customer_storefront.png',
        caption: 'High-Velocity Customer Storefront',
      },
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/northstar_commerce_operations.png',
        caption: 'Order Operations & ERP Sync',
      },
    ],
  },
];

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
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

  // Lock body scroll and listen for Escape key when lightbox is open
  useEffect(() => {
    if (!activeImageModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImageModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImageModal]);

  const current = projects[activeProject];

  const handleImageKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveImageModal(url);
    }
  };

  return (
    <section id="work" ref={sectionRef} className={`section ${styles.workSection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div>
            <div className="label-eyebrow">
              <span className="label-dot" />
              <span>05 — SELECTED WORK & CASE STUDIES</span>
            </div>
            <h2 className={styles.headline}>
              Engineered for real enterprises.{' '}
              <span className={styles.accentText}>Proven in production.</span>
            </h2>
          </div>

          {/* Project Switcher Pills */}
          <div className={styles.projectPills} role="tablist" aria-label="Select case study">
            {projects.map((p, idx) => {
              const isActive = idx === activeProject;
              return (
                <button
                  key={p.number}
                  onClick={() => setActiveProject(idx)}
                  className={`${styles.projectPill} ${isActive ? styles.projectPillActive : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`case-study-${p.number}`}
                  id={`tab-${p.number}`}
                >
                  <span className={styles.pillNumber}>{p.number}</span>
                  <span className={styles.pillName}>{p.name.toUpperCase()}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectIndicator"
                      className={styles.activePillGlow}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.number}
            id={`case-study-${current.number}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.number}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.caseStudyCard}
          >
            {/* Top Bar */}
            <div className={styles.caseHeader}>
              <div>
                <div className={styles.metaTop}>
                  <span className={styles.caseNum}>CASE STUDY {current.number}</span>
                  <span className={styles.metaDivider}>/</span>
                  <span className={styles.industryTag}>{current.industry}</span>
                </div>
                <h3 className={styles.caseTitle}>{current.name}</h3>
              </div>

              <div className={styles.locationBadge}>
                <span>{current.clientLocation}</span>
              </div>
            </div>

            {/* Metrics Impact Bar */}
            <div className={styles.metricsBar}>
              {current.metrics.map((m, i) => (
                <div key={i} className={styles.metricItem}>
                  <div className={styles.metricItemValue}>{m.value}</div>
                  <div className={styles.metricItemLabel}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Visual Media Showcase */}
            <div className={styles.mediaGrid}>
              {/* Primary Featured Image */}
              <div 
                className={styles.mainImageWrapper}
                onClick={() => setActiveImageModal(current.images[0].url)}
                onKeyDown={(e) => handleImageKeyDown(e, current.images[0].url)}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${current.name} architecture image: ${current.images[0].caption}`}
              >
                <Image
                  src={current.images[0].url}
                  alt={`${current.name} — ${current.images[0].caption}`}
                  fill
                  className={styles.caseImage}
                  sizes="(max-width: 1024px) 100vw, 650px"
                  priority
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageCaption}>{current.images[0].caption}</span>
                  <span className={styles.expandHint}>Click to Inspect ↗</span>
                </div>
              </div>

              {/* Sub-Images Column */}
              <div className={styles.subImagesCol}>
                <div 
                  className={styles.subImageWrapper}
                  onClick={() => setActiveImageModal(current.images[1].url)}
                  onKeyDown={(e) => handleImageKeyDown(e, current.images[1].url)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect ${current.name} screenshot: ${current.images[1].caption}`}
                >
                  <Image
                    src={current.images[1].url}
                    alt={`${current.name} — ${current.images[1].caption}`}
                    fill
                    className={styles.caseImage}
                    sizes="(max-width: 1024px) 50vw, 320px"
                  />
                  <div className={styles.imageOverlaySmall}>
                    <span>{current.images[1].caption}</span>
                  </div>
                </div>

                <div 
                  className={styles.subImageWrapper}
                  onClick={() => setActiveImageModal(current.images[2].url)}
                  onKeyDown={(e) => handleImageKeyDown(e, current.images[2].url)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect ${current.name} screenshot: ${current.images[2].caption}`}
                >
                  <Image
                    src={current.images[2].url}
                    alt={`${current.name} — ${current.images[2].caption}`}
                    fill
                    className={styles.caseImage}
                    sizes="(max-width: 1024px) 50vw, 320px"
                  />
                  <div className={styles.imageOverlaySmall}>
                    <span>{current.images[2].caption}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive Narrative Details */}
            <div className={styles.detailsGrid}>
              <div className={styles.narrativeCol}>
                <h4 className={styles.headlineSummary}>{current.headline}</h4>
                <p className={styles.overviewText}>{current.overview}</p>

                <div className={styles.challengeSolutionBox}>
                  <div className={styles.boxSection}>
                    <div className={styles.boxLabel}>THE CHALLENGE</div>
                    <p className={styles.boxText}>{current.challenge}</p>
                  </div>
                  <div className={styles.boxDivider} />
                  <div className={styles.boxSection}>
                    <div className={styles.boxLabel}>THE ENGINEERING SOLUTION</div>
                    <p className={styles.boxText}>{current.solution}</p>
                  </div>
                  <div className={styles.boxDivider} />
                  <div className={styles.boxSection}>
                    <div className={styles.boxLabel}>THE BUSINESS OUTCOME</div>
                    <p className={styles.boxText}>{current.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Meta & Tech Stack Side Column */}
              <div className={styles.metaSideCol}>
                <div className={styles.sideBlock}>
                  <div className={styles.sideBlockLabel}>ZEETECH RESPONSIBILITY</div>
                  <div className={styles.contributionList}>
                    {current.contribution.map((c, i) => (
                      <div key={i} className={styles.contribItem}>
                        <CheckCircle2 size={14} className={styles.contribCheck} />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.sideBlock}>
                  <div className={styles.sideBlockLabel}>TECHNOLOGY STACK</div>
                  <div className={styles.techBadgeCloud}>
                    {current.technology.map((t, i) => (
                      <span key={i} className={styles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.actionBlock}>
                  <a href="#contact" className={styles.discussCaseBtn}>
                    <span>Discuss Similar Architecture</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageModal(null)}
            role="dialog"
            aria-modal="true"
            aria-label="High-resolution architecture diagram inspection"
          >
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.closeLightbox}
                onClick={() => setActiveImageModal(null)}
                aria-label="Close image preview"
              >
                ✕ Close
              </button>
              <div className={styles.lightboxImageContainer}>
                <Image
                  src={activeImageModal}
                  alt="Architecture preview"
                  fill
                  className={styles.modalImage}
                  sizes="90vw"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
