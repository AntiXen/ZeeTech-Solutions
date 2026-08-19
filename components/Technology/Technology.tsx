'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TechLogo } from './TechLogos';
import { Layout, Server, Cloud, Cpu, CheckCircle2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './Technology.module.css';

interface TechItem {
  name: string;
  category: string;
  role: string;
  benefit: string;
}

interface TechLayer {
  number: string;
  title: string;
  icon: React.ElementType;
  description: string;
  items: TechItem[];
}

const techLayers: TechLayer[] = [
  {
    number: '01',
    title: 'Interfaces & Experience',
    icon: Layout,
    description: 'High-performance rendering, accessible component systems, and responsive user flows.',
    items: [
      { name: 'React', category: 'UI Library', role: 'Component architecture & state management', benefit: 'Declarative, ecosystem scale' },
      { name: 'Next.js', category: 'Framework', role: 'Server components & edge SSR', benefit: 'Sub-second LCP & SEO' },
      { name: 'Flutter', category: 'Mobile SDK', role: 'Native iOS & Android compilation', benefit: 'Single codebase, 60fps' },
      { name: 'TypeScript', category: 'Language', role: 'End-to-end type safety', benefit: 'Zero runtime type errors' },
      { name: 'Tailwind CSS', category: 'Styling', role: 'Utility styling & token design', benefit: 'Rapid, consistent UI' },
      { name: 'Figma', category: 'Design Tool', role: 'Design systems & interactive prototypes', benefit: 'Pixel-perfect translation' },
    ],
  },
  {
    number: '02',
    title: 'Distributed Systems & Data',
    icon: Server,
    description: 'Event-driven transactional engines, resilient databases, and high-throughput API gateways.',
    items: [
      { name: 'Node.js', category: 'Runtime', role: 'Asynchronous event-driven services', benefit: 'High concurrent I/O' },
      { name: 'Go', category: 'Language', role: 'High-throughput microservices', benefit: 'Sub-millisecond compute' },
      { name: 'Python', category: 'Language', role: 'Data processing & ML backends', benefit: 'Rich AI/data ecosystem' },
      { name: 'PostgreSQL', category: 'RDBMS', role: 'ACID transactional persistence', benefit: 'Data integrity & scale' },
      { name: 'Redis', category: 'In-Memory', role: 'Sub-millisecond caching & queues', benefit: 'Extreme memory speed' },
      { name: 'GraphQL', category: 'API Query', role: 'Client-driven precise data fetching', benefit: 'Zero over-fetching' },
      { name: 'REST APIs', category: 'API Protocol', role: 'Standardized external integrations', benefit: 'Universal interop' },
    ],
  },
  {
    number: '03',
    title: 'Cloud, Security & DevOps',
    icon: Cloud,
    description: 'Automated CI/CD deployment pipelines, container orchestration, and zero-downtime infrastructure.',
    items: [
      { name: 'AWS', category: 'Cloud Host', role: 'Enterprise compute & storage', benefit: '99.99% global SLA' },
      { name: 'GCP', category: 'Cloud Host', role: 'Data analytics & AI cluster host', benefit: 'Advanced telemetry' },
      { name: 'Docker', category: 'Containers', role: 'Deterministic runtime isolation', benefit: 'Identical env parity' },
      { name: 'Kubernetes', category: 'Orchestrator', role: 'Auto-scaling & self-healing clusters', benefit: 'Resilient high load' },
      { name: 'CI/CD Pipelines', category: 'Automation', role: 'Automated testing & zero-downtime deploys', benefit: 'Fast release velocity' },
      { name: 'Terraform', category: 'IaC', role: 'Infrastructure-as-code versioning', benefit: 'Reproducible setups' },
      { name: 'Vercel', category: 'Edge Platform', role: 'Global edge CDN & serverless compute', benefit: 'Instant worldwide cache' },
    ],
  },
  {
    number: '04',
    title: 'AI & Data Intelligence',
    icon: Cpu,
    description: 'Deterministic AI agents, retrieval-augmented generation (RAG), and workflow automation.',
    items: [
      { name: 'OpenAI / LLMs', category: 'AI Models', role: 'Generative reasoning & domain agents', benefit: 'Autonomous workflows' },
      { name: 'LangChain', category: 'AI Framework', role: 'Chaining & tool-calling pipelines', benefit: 'Structured agentic flow' },
      { name: 'PyTorch', category: 'ML Library', role: 'Custom model fine-tuning & evaluation', benefit: 'Tailored embeddings' },
      { name: 'Vector Databases', category: 'Search Index', role: 'Semantic high-dimensional similarity search', benefit: 'Sub-second RAG search' },
      { name: 'Custom Pipelines', category: 'Data Flow', role: 'ETL pipelines & data transformation', benefit: 'Real-time intelligence' },
      { name: 'Data Automation', category: 'Operations', role: 'Background batch jobs & synchronization', benefit: 'Eliminating manual work' },
    ],
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

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

      const layers = layersRef.current?.querySelectorAll(`.${styles.layerCard}`);
      if (layers && layers.length > 0) {
        gsap.fromTo(
          layers,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: layersRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" ref={sectionRef} className={`section ${styles.techSection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>10 — TECHNOLOGY ARCHITECTURE</span>
          </div>

          <h2 className={styles.headline}>
            The right tool for the problem.{' '}
            <span className={styles.accentText}>Never trend-chasing.</span>
          </h2>
          <p className={styles.subheadline}>
            We select technologies based on production reliability, latency SLAs, talent availability, and 5-year maintenance economics.
          </p>
        </div>

        {/* 4 Architecture Layers Grid */}
        <div ref={layersRef} className={styles.layersGrid}>
          {techLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div key={layer.number} className={styles.layerCard}>
                <div className={styles.layerHeader}>
                  <div className={styles.layerTitleGroup}>
                    <div className={styles.layerIcon}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className={styles.layerNum}>LAYER {layer.number}</span>
                      <h3 className={styles.layerTitle}>{layer.title}</h3>
                    </div>
                  </div>
                </div>

                <p className={styles.layerDesc}>{layer.description}</p>

                {/* Tech Badges List */}
                <div className={styles.techItemsList}>
                  {layer.items.map((item) => {
                    const isSelected = hoveredTech?.name === item.name;
                    return (
                      <div
                        key={item.name}
                        className={`${styles.techBadge} ${isSelected ? styles.techBadgeActive : ''}`}
                        onMouseEnter={() => setHoveredTech(item)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={() => setHoveredTech((prev) => (prev?.name === item.name ? null : item))}
                        onFocus={() => setHoveredTech(item)}
                        onBlur={() => setHoveredTech(null)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        aria-label={`${item.name} (${item.category}): ${item.role}`}
                      >
                        <div className={styles.badgeLogo}>
                          <TechLogo name={item.name} />
                        </div>
                        <span className={styles.badgeName}>{item.name}</span>
                        <span className={styles.badgeCategory}>{item.category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Hover Detail Inspector */}
        {hoveredTech && (
          <div className={styles.inspectorBar} role="region" aria-live="polite">
            <div className={styles.inspectorLogo}>
              <TechLogo name={hoveredTech.name} />
            </div>
            <div className={styles.inspectorDetails}>
              <span className={styles.inspectorName}>{hoveredTech.name} ({hoveredTech.category})</span>
              <span className={styles.inspectorDivider}>·</span>
              <span className={styles.inspectorRole}>{hoveredTech.role}</span>
              <span className={styles.inspectorDivider}>·</span>
              <span className={styles.inspectorBenefit}>Key ROI: {hoveredTech.benefit}</span>
            </div>
          </div>
        )}

        {/* Technology Selection Standard Box */}
        <div className={styles.standardBox}>
          <div className={styles.standardHeader}>
            <CheckCircle2 size={18} className={styles.standardCheck} />
            <h4>Our 4-Point Technology Guarantee</h4>
          </div>
          <div className={styles.standardGrid}>
            <div className={styles.standardItem}>
              <strong>1. Zero Vendor Lock-in:</strong> Open standards, clean Docker containers, and standard SQL databases.
            </div>
            <div className={styles.standardItem}>
              <strong>2. 100% Codebase Ownership:</strong> Full Git repository transfer with complete IP assignment upon delivery.
            </div>
            <div className={styles.standardItem}>
              <strong>3. Automated Testing Suites:</strong> Continuous integration with unit, integration, and end-to-end regression tests.
            </div>
            <div className={styles.standardItem}>
              <strong>4. Complete Documentation:</strong> Architecture decision records (ADRs), OpenAPI specs, and setup runbooks.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
