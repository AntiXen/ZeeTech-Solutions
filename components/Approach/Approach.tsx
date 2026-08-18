'use client';

import React, { useRef, useEffect } from 'react';
import { Search, Compass, Palette, Code, Rocket, RefreshCw, CheckCircle2 } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import styles from './Approach.module.css';

interface Step {
  num: string;
  phase: string;
  icon: React.ElementType;
  title: string;
  description: string;
  activities: string[];
}

const lifecycleSteps: Step[] = [
  {
    num: '01',
    phase: 'DISCOVER & AUDIT',
    icon: Search,
    title: 'Understand the Unit Economics & Bottlenecks',
    description: 'We conduct rigorous discovery interviews, map user journeys, and audit your existing technology stack to identify real constraints.',
    activities: ['Stakeholder Interviews', 'User Workflow Mapping', 'Architecture Audit', 'Scope & Budget Alignment'],
  },
  {
    num: '02',
    phase: 'CHALLENGE & STRATEGIZE',
    icon: Compass,
    title: 'Challenge Assumptions Before Writing Code',
    description: 'We stress-test feature lists against market realities. If an alternative technical path saves 40% cost or 2x speed, we propose it firmly.',
    activities: ['Trade-off Analysis', 'Tech Stack Selection', 'API & Data Modeling', 'Technical Roadmap'],
  },
  {
    num: '03',
    phase: 'DESIGN & PROTOTYPE',
    icon: Palette,
    title: 'Validate UX with Clickable High-Fidelity Prototypes',
    description: 'We create interactive Figma prototypes and design systems to validate the complete user experience with real stakeholders before development.',
    activities: ['Design Systems Tokens', 'High-Fidelity Wireframes', 'Interactive Prototypes', 'Design-to-Code Specs'],
  },
  {
    num: '04',
    phase: 'SPRINT & BUILD',
    icon: Code,
    title: 'Disciplined Engineering in 2-Week Sprints',
    description: 'Clean, type-safe architecture with continuous integration, automated unit tests, and bi-weekly working software demos.',
    activities: ['Bi-Weekly Working Demos', 'Automated CI/CD Tests', 'Code Reviews & Audits', 'Staging Environments'],
  },
  {
    num: '05',
    phase: 'LAUNCH & STRESS-TEST',
    icon: Rocket,
    title: 'Zero-Downtime Deployment & Observability',
    description: 'Comprehensive load testing, multi-region cloud rollout, automated fallback routines, and end-to-end Sentry telemetry.',
    activities: ['Load & Penetration Testing', 'Cloud Provisioning', 'Telemetry & Alerting', 'Production Cutover'],
  },
  {
    num: '06',
    phase: 'MEASURE & EVOLVE',
    icon: RefreshCw,
    title: 'Continuous Optimization & SLA Support',
    description: 'Software compounds in value when continuously refined. We monitor telemetry, optimize conversion funnels, and ship new roadmap features.',
    activities: ['Telemetry Analysis', 'Conversion Tuning', 'SLA Technical Support', 'Ongoing Feature Sprints'],
  },
];

const consultationCheckpoints = [
  { id: '1', title: 'Business Model Viability' },
  { id: '2', title: 'Core User Personas' },
  { id: '3', title: 'Critical Failure Points' },
  { id: '4', title: 'Target Latency & Volume' },
  { id: '5', title: 'Security & Compliance' },
  { id: '6', title: 'Long-term Maintenance Cost' },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

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

      const cards = stepsContainerRef.current?.querySelectorAll(`.${styles.stepCard}`);
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
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
    <section id="approach" ref={sectionRef} className={`section ${styles.approachSection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>06 — HOW WE OPERATE</span>
          </div>
          <h2 className={styles.headline}>
            We don’t start with code.{' '}
            <span className={styles.accentText}>We start with rigorous questions.</span>
          </h2>
          <p className={styles.subheadline}>
            The consulting comes before the engineering — and it’s why our software ships on time, stays within budget, and actually performs in the market.
          </p>
        </div>

        {/* 6-Step Lifecycle Grid */}
        <div ref={stepsContainerRef} className={styles.stepsGrid}>
          {lifecycleSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepIcon}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.stepNum}>STEP {step.num}</span>
                </div>

                <div className={styles.stepPhase}>{step.phase}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>

                <div className={styles.activitiesList}>
                  {step.activities.map((act, i) => (
                    <div key={i} className={styles.activityItem}>
                      <CheckCircle2 size={13} className={styles.actCheck} />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pre-Build Discovery Checkpoints Strip */}
        <div className={styles.discoveryStrip}>
          <div className={styles.discoveryHeader}>
            <span className={styles.discoveryBadge}>PRE-ENGINEERING RIGOR</span>
            <h4 className={styles.discoveryTitle}>Every project begins with a 6-point foundational audit:</h4>
          </div>

          <div className={styles.checkpointsGrid}>
            {consultationCheckpoints.map((pt) => (
              <div key={pt.id} className={styles.checkpointTag}>
                <span className={styles.checkpointNum}>0{pt.id}</span>
                <span className={styles.checkpointText}>{pt.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
