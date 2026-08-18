'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './WhatWeBuild.module.css';

interface SolutionItem {
  id: string;
  name: string;
  desc: string;
  specs: string[];
  tech: string[];
}

interface Category {
  letter: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  items: SolutionItem[];
}

const categories: Category[] = [
  {
    letter: 'A',
    title: 'Digital Products & Platforms',
    icon: Layers,
    summary: 'Customer-facing and internal software engineered for product-market fit, conversion, and effortless user experience.',
    items: [
      {
        id: 'A1',
        name: 'Multi-Tenant SaaS Applications',
        desc: 'Subscription architectures, role-based access control, billing engines, and tenant isolation engineered to scale.',
        specs: ['Role-Based Access (RBAC)', 'Stripe/Paddle Billing', 'Multi-Region Isolation'],
        tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis']
      },
      {
        id: 'A2',
        name: 'Cross-Platform Mobile Apps',
        desc: 'Fast, native-feeling iOS and Android applications with offline-first synchronization and biometric security.',
        specs: ['Offline-First Sync', 'Biometric Auth', 'Push Notifications'],
        tech: ['Flutter', 'React Native', 'Firebase', 'GraphQL']
      },
      {
        id: 'A3',
        name: 'High-Converting Web Platforms',
        desc: 'Lightning-fast digital platforms optimized for search engines, Core Web Vitals, and conversion funnels.',
        specs: ['Sub-Second LCP', 'Programmatic SEO', 'Dynamic Personalization'],
        tech: ['Next.js App Router', 'Tailwind', 'Edge Functions', 'Vercel']
      },
      {
        id: 'A4',
        name: 'Rapid Enterprise MVPs',
        desc: 'Focused first releases engineered with production architecture so you learn fast without rebuilding later.',
        specs: ['4–6 Week Sprints', 'Production Architecture', 'Instrumentation Ready'],
        tech: ['TypeScript', 'Supabase', 'PostgreSQL', 'Docker']
      }
    ]
  },
  {
    letter: 'B',
    title: 'Enterprise Core Systems',
    icon: Server,
    summary: 'Mission-critical backends, operational workflows, and transactional engines built for zero downtime and data integrity.',
    items: [
      {
        id: 'B1',
        name: 'Fintech & Payment Infrastructure',
        desc: 'Event-driven reconciliation engines, multi-currency wallets, automated ledger accounting, and banking integrations.',
        specs: ['Sub-50ms Latency', 'Double-Entry Ledger', 'PCI-DSS Compliance'],
        tech: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka']
      },
      {
        id: 'B2',
        name: 'Custom ERP & Operations Suites',
        desc: 'Tailored enterprise resource management connecting inventory, logistics, HR, and financials into a single source of truth.',
        specs: ['Real-Time Inventory', 'Custom Workflow Triggers', 'Multi-Warehouse Sync'],
        tech: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'AWS']
      },
      {
        id: 'B3',
        name: 'Real-Time Dispatch & Fleet Tracking',
        desc: 'Interactive map engines, automated dispatch algorithms, geofencing, and field staff telemetry.',
        specs: ['Live GPS Telemetry', 'Smart Job Routing', 'Driver Mobile App'],
        tech: ['Flutter', 'Node.js', 'WebSockets', 'Mapbox', 'Redis']
      },
      {
        id: 'B4',
        name: 'Workflow Automation Engines',
        desc: 'Eliminating manual data entry and human error through robust event-triggered system integrations.',
        specs: ['Zero Data Loss', 'Automated Fallbacks', 'Audit Log Trail'],
        tech: ['Node.js', 'Python', 'AWS SQS', 'Docker']
      }
    ]
  },
  {
    letter: 'C',
    title: 'Cloud, Data & AI Systems',
    icon: Cpu,
    summary: 'Modern distributed infrastructure, intelligent agent pipelines, and high-throughput data systems.',
    items: [
      {
        id: 'C1',
        name: 'Autonomous AI Agents & LLM Pipelines',
        desc: 'Domain-specific language model agents, RAG search pipelines, and automated intelligence layers that add tangible ROI.',
        specs: ['Vector RAG Retrieval', 'Cost-Optimized Routing', 'Deterministic Guardrails'],
        tech: ['OpenAI', 'LangChain', 'Pinecone', 'Python', 'FastAPI']
      },
      {
        id: 'C2',
        name: 'Cloud Native Infrastructure & DevOps',
        desc: 'Automated CI/CD pipelines, Kubernetes cluster orchestration, Terraform infrastructure-as-code, and zero-downtime deploys.',
        specs: ['Infrastructure-as-Code', 'Auto-Scaling Clusters', 'Zero-Downtime Rollouts'],
        tech: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform']
      },
      {
        id: 'C3',
        name: 'High-Throughput API Ecosystems',
        desc: 'Public and partner API gateways with strict rate limiting, cryptographic signatures, and automated documentation.',
        specs: ['OAuth2 / JWT Security', 'Granular Rate Limiting', 'OpenAPI Documentation'],
        tech: ['Go', 'Node.js', 'GraphQL', 'REST', 'Kong']
      }
    ]
  }
];

export default function WhatWeBuild() {
  const [activeCategory, setActiveCategory] = useState(0);
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

  const currentCat = categories[activeCategory];

  return (
    <section id="build" ref={sectionRef} className={`section ${styles.buildSection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>04 — WHAT WE BUILD</span>
          </div>

          <h2 className={styles.headline}>
            Complex challenges deserve{' '}
            <span className={styles.accentText}>purpose-built architecture.</span>
          </h2>
          <p className={styles.subheadline}>
            We engineer bespoke software systems across three core categories — designed for resilience, velocity, and measurable business outcomes.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = idx === activeCategory;
            return (
              <button
                key={cat.letter}
                onClick={() => setActiveCategory(idx)}
                className={`${styles.catTab} ${isActive ? styles.catTabActive : ''}`}
                role="tab"
                aria-selected={isActive}
              >
                <div className={styles.catTabLeft}>
                  <div className={styles.catTabIcon}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className={styles.catTabLetter}>CATEGORY {cat.letter}</span>
                    <h3 className={styles.catTabTitle}>{cat.title}</h3>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeBuildCategory"
                    className={styles.activeGlow}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCat.letter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={styles.categoryContainer}
          >
            <div className={styles.categoryBanner}>
              <div className={styles.bannerInfo}>
                <span className={styles.bannerTag}>CATEGORY {currentCat.letter} MATRIX</span>
                <h3 className={styles.bannerTitle}>{currentCat.title}</h3>
                <p className={styles.bannerSummary}>{currentCat.summary}</p>
              </div>
            </div>

            {/* Grid of Solution Cards */}
            <div className={styles.solutionGrid}>
              {currentCat.items.map((item) => (
                <div key={item.id} className={styles.solutionCard}>
                  <div className={styles.cardTop}>
                    <span className={styles.itemId}>{item.id}</span>
                    <ArrowRight size={16} className={styles.cardArrow} />
                  </div>

                  <h4 className={styles.cardTitle}>{item.name}</h4>
                  <p className={styles.cardDesc}>{item.desc}</p>

                  <div className={styles.specsWrapper}>
                    <div className={styles.specsLabel}>ARCHITECTURAL HIGHLIGHTS:</div>
                    <div className={styles.specsList}>
                      {item.specs.map((spec, i) => (
                        <div key={i} className={styles.specItem}>
                          <CheckCircle2 size={13} className={styles.specCheck} />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.techPills}>
                    {item.tech.map((t, i) => (
                      <span key={i} className={styles.techPill}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Assurance */}
        <div className={styles.bottomAssurance}>
          <p>
            Have a custom requirement not listed above? If it involves modern code, we’ve likely built something similar — and if we haven’t, we’ll tell you honestly during our first call.
          </p>
        </div>
      </div>
    </section>
  );
}
