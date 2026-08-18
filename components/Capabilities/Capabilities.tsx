'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code2, TrendingUp, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import styles from './Capabilities.module.css';

interface Discipline {
  id: string;
  num: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  deliverables: string[];
  capabilities: { title: string; desc: string }[];
}

const disciplines: Discipline[] = [
  {
    id: 'design',
    num: '01',
    name: 'Product Design',
    icon: Palette,
    tagline: 'Shape intuitive experiences that convert and delight.',
    description:
      'We research user workflows, map complex architectures, and craft interfaces that make sophisticated software feel simple, coherent, and fast.',
    deliverables: ['Interactive Prototypes', 'Design Systems (Figma)', 'UX Research & Journey Maps', 'Micro-Interactions'],
    capabilities: [
      { title: 'UI/UX Architecture', desc: 'High-fidelity design systems and user experience frameworks.' },
      { title: 'Interactive Prototyping', desc: 'Clickable realistic prototypes validated before engineering.' },
      { title: 'Design Systems', desc: 'Scalable token systems and component libraries in Figma & code.' },
      { title: 'Product Strategy & UX Audit', desc: 'Identifying friction points and optimizing conversion funnels.' },
      { title: 'Brand Identity Systems', desc: 'Digital-first visual identities built for software products.' },
    ],
  },
  {
    id: 'engineering',
    num: '02',
    name: 'Full-Stack Engineering',
    icon: Code2,
    tagline: 'Engineered for extreme performance, security, and scale.',
    description:
      'We build web applications, mobile apps, SaaS platforms, and distributed backend systems with rigorous engineering discipline, tested code, and modern cloud architecture.',
    deliverables: ['Production Web & Mobile Apps', 'Event-Driven Microservices', 'High-Throughput APIs', 'CI/CD Cloud Pipelines'],
    capabilities: [
      { title: 'Web Applications & SaaS', desc: 'Next.js, React, TypeScript enterprise platforms.' },
      { title: 'Mobile Apps (iOS & Android)', desc: 'Cross-platform Flutter & native mobile applications.' },
      { title: 'Microservices & APIs', desc: 'Node.js, Go, Python, GraphQL, and high-performance REST APIs.' },
      { title: 'Cloud Infrastructure & DevOps', desc: 'AWS, GCP, Docker, Kubernetes, and automated Terraform.' },
      { title: 'Database & Event Systems', desc: 'PostgreSQL, Redis, Kafka, and event-driven architectures.' },
      { title: 'AI & Automation Integration', desc: 'LLM agents, vector embeddings, and workflow automation.' },
    ],
  },
  {
    id: 'growth',
    num: '03',
    name: 'Growth & Optimization',
    icon: TrendingUp,
    tagline: 'Create compounding momentum with measurement, not guesswork.',
    description:
      'Shipping code is just the start. We engineer conversion-optimized landing pages, technical SEO foundations, analytics pipelines, and performance enhancements that grow revenue.',
    deliverables: ['Technical SEO Audits', 'Conversion Rate Optimization', 'Analytics & Telemetry', 'Core Web Vitals Pass'],
    capabilities: [
      { title: 'Technical SEO & Programmatic Pages', desc: 'Schema markup, indexation, and Core Web Vitals optimization.' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Data-driven landing pages and user onboarding funnels.' },
      { title: 'Product Telemetry & Analytics', desc: 'Custom event tracking, PostHog, Mixpanel, and GA4 setups.' },
      { title: 'Speed & Load Time Audits', desc: 'Sub-second page loads, asset compression, and edge caching.' },
    ],
  },
  {
    id: 'care',
    num: '04',
    name: 'Continuous Care & Support',
    icon: ShieldCheck,
    tagline: 'Protect your investment with 24/7 reliability and evolution.',
    description:
      'Software requires active attention to stay ahead. We provide infrastructure monitoring, security patching, SLA-backed bug fixes, and continuous feature development as your market grows.',
    deliverables: ['24/7 Infrastructure Monitoring', 'Security Patches', 'Guaranteed SLA Support', 'Continuous Feature Sprints'],
    capabilities: [
      { title: 'SLA-Backed Technical Support', desc: 'Guaranteed turnaround times for critical fixes and updates.' },
      { title: 'Security & Vulnerability Audits', desc: 'Continuous dependency scanning and compliance updates.' },
      { title: 'Performance Monitoring & Sentry', desc: 'Real-time error tracking, uptime alerts, and zero-downtime deploys.' },
      { title: 'Ongoing Sprint Capacity', desc: 'Dedicated engineering bandwidth to ship roadmap features continuously.' },
    ],
  },
];

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const current = disciplines[activeTab];
  const Icon = current.icon;

  return (
    <section id="capabilities" ref={sectionRef} className={`section ${styles.capabilitiesSection}`}>
      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>03 — CAPABILITIES & DISCIPLINES</span>
          </div>

          <h2 className={styles.headline}>
            From <span className={styles.accentText}>first concept</span> to{' '}
            <span className={styles.accentSecondary}>long-term scale.</span>
          </h2>
          <p className={styles.subheadline}>
            We provide end-to-end engineering, design, and growth capabilities that turn technical debt into lasting competitive advantage.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className={styles.tabBar}>
          {disciplines.map((item, idx) => {
            const TabIcon = item.icon;
            const isActive = idx === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                aria-selected={isActive}
                role="tab"
              >
                <TabIcon size={18} className={styles.tabBtnIcon} />
                <span className={styles.tabBtnNumber}>{item.num}</span>
                <span className={styles.tabBtnText}>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCapabilityTab"
                    className={styles.activeTabGlow}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Discipline Content Showcase */}
        <div ref={contentRef} className={styles.showcaseStage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={styles.stageGrid}
            >
              {/* Left Column: Discipline Overview */}
              <div className={styles.overviewCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className={styles.disciplineNum}>DISCIPLINE {current.num}</span>
                    <h3 className={styles.disciplineTitle}>{current.name}</h3>
                  </div>
                </div>

                <p className={styles.tagline}>{current.tagline}</p>
                <p className={styles.description}>{current.description}</p>

                <div className={styles.deliverablesBox}>
                  <div className={styles.deliverablesTitle}>CORE DELIVERABLES:</div>
                  <div className={styles.deliverablesList}>
                    {current.deliverables.map((del, i) => (
                      <div key={i} className={styles.deliverableItem}>
                        <CheckCircle size={15} className={styles.checkIcon} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Capabilities Matrix */}
              <div className={styles.matrixGrid}>
                {current.capabilities.map((cap, i) => (
                  <div key={i} className={styles.capabilityCard}>
                    <div className={styles.capabilityTop}>
                      <span className={styles.capabilityIndex}>0{i + 1}</span>
                      <ArrowRight size={16} className={styles.capArrow} />
                    </div>
                    <h4 className={styles.capabilityTitle}>{cap.title}</h4>
                    <p className={styles.capabilityDesc}>{cap.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
