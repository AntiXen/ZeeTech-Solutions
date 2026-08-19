'use client';

import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import StatCounter from '@/components/shared/StatCounter/StatCounter';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './Impact.module.css';

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

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

      const items = bentoRef.current?.querySelectorAll(`.${styles.bentoItem}`);
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoRef.current,
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
    <section id="impact" ref={sectionRef} className={`section ${styles.impactSection}`}>
      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>MEASURABLE OUTCOMES & REPUTATION</span>
          </div>

          <h2 className={styles.headline}>
            Numbers that represent{' '}
            <span className={styles.accentText}>tangible business value.</span>
          </h2>
          <p className={styles.subheadline}>
            We hold ourselves accountable to real metrics: throughput gains, latency reduction, conversion rate lifts, and uninterrupted uptime.
          </p>
        </div>

        {/* Bento Grid of Stats & Proof Elements */}
        <div ref={bentoRef} className={styles.bentoGrid}>
          {/* Bento Item 1: Large Stat Counter */}
          <div className={`${styles.bentoItem} ${styles.statBox}`}>
            <StatCounter
              value={250}
              suffix="+"
              label="Projects Delivered Worldwide"
              description="High-converting web apps, cross-platform mobile suites, and scalable enterprise backends."
            />
          </div>

          {/* Bento Item 2: Uptime & SLA */}
          <div className={`${styles.bentoItem} ${styles.statBox}`}>
            <StatCounter
              value={99.9}
              suffix="%"
              decimals={1}
              label="Production SLA & Reliability"
              description="High-availability cloud infrastructure engineered with automated failovers and real-time telemetry."
            />
          </div>

          {/* Bento Item 3: Countries Served */}
          <div className={`${styles.bentoItem} ${styles.statBox}`}>
            <StatCounter
              value={14}
              suffix="+"
              label="Countries Served"
              description="Active client deployments across North America, Europe, the Middle East, and Asia-Pacific."
            />
          </div>

          {/* Bento Item 4: Throughput Multiplier */}
          <div className={`${styles.bentoItem} ${styles.statBox}`}>
            <StatCounter
              value={4}
              suffix="×"
              label="Average Throughput Gain"
              description="Achieved through event-driven microservices, Redis caching, and optimized database indexing."
            />
          </div>

          {/* Bento Item 5: Feature Showcase Card */}
          <div className={`${styles.bentoItem} ${styles.featureCard}`}>
            <div className={styles.featureHeader}>
              <div className={styles.featureIconCircle}>
                <ShieldCheck size={22} />
              </div>
              <span className={styles.featureBadge}>ENGINEERING STANDARDS</span>
            </div>
            <h3 className={styles.featureTitle}>100% In-House Senior Engineering</h3>
            <p className={styles.featureDesc}>
              We never outsource your core IP to unvetted freelancers. Every line of code is written, reviewed, and audited by our dedicated core engineering team.
            </p>
            <div className={styles.featureChecklist}>
              <div className={styles.checkRow}>
                <CheckCircle2 size={15} className={styles.checkIcon} />
                <span>Zero offshore broker markup</span>
              </div>
              <div className={styles.checkRow}>
                <CheckCircle2 size={15} className={styles.checkIcon} />
                <span>Direct daily communication with architects</span>
              </div>
            </div>
          </div>

          {/* Bento Item 6: Retention & Partnership */}
          <div className={`${styles.bentoItem} ${styles.featureCard} ${styles.accentGlowCard}`}>
            <div className={styles.featureHeader}>
              <div className={styles.featureIconCircle}>
                <Award size={22} />
              </div>
              <span className={styles.featureBadge}>CLIENT LOYALTY</span>
            </div>
            <h3 className={styles.featureTitle}>98% Client Retention & Multi-Year Partnerships</h3>
            <p className={styles.featureDesc}>
              Over 90% of our clients continue with ongoing feature development and infrastructure care after their initial product release.
            </p>
            <div className={styles.featureChecklist}>
              <div className={styles.checkRow}>
                <CheckCircle2 size={15} className={styles.checkIcon} />
                <span>Longest active client partnership: 5+ years</span>
              </div>
              <div className={styles.checkRow}>
                <CheckCircle2 size={15} className={styles.checkIcon} />
                <span>Continuous roadmap iteration & SLA support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
