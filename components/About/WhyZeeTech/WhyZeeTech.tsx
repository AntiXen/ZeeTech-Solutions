'use client';

import React, { useRef, useEffect } from 'react';
import { Target, Lightbulb, Shield, Users } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './WhyZeeTech.module.css';

interface Principle {
  number: string;
  title: string;
  icon: React.ElementType;
  takeaway: string;
  description: string;
  rationale: string;
}

const principles: Principle[] = [
  {
    number: '01',
    title: 'Business Outcomes Before Technology Stacks',
    icon: Target,
    takeaway: 'Zero vanity engineering',
    description:
      'We don’t adopt new frameworks or complex patterns for the sake of hype. Every architecture decision is rigorously justified by your unit economics, user conversion, and operational margin.',
    rationale: 'If a simpler architecture achieves the target latency at half the hosting and maintenance cost, we choose simplicity every time.',
  },
  {
    number: '02',
    title: 'Think Beyond the Given Specification',
    icon: Lightbulb,
    takeaway: 'Proactive co-founder mindset',
    description:
      'The best digital solutions address the strategic requirement behind the feature request. We challenge assumptions respectfully and present alternatives that unlock superior business leverage.',
    rationale: 'Clients hire ZeeTech for technical leadership, not passive mechanical ticket execution.',
  },
  {
    number: '03',
    title: 'Engineered for Scale, Built for What’s Next',
    icon: Shield,
    takeaway: 'No rewrite traps',
    description:
      'We write modular, type-safe, thoroughly documented codebases backed by automated CI/CD pipelines. Our systems are engineered to scale seamlessly with your revenue, eliminating painful rebuilds next year.',
    rationale: 'Clean domain boundaries and distributed event queues let your team add features without degrading existing system stability.',
  },
  {
    number: '04',
    title: 'Long-Term Strategic Partnership Over Single Projects',
    icon: Users,
    takeaway: 'Skin in the game',
    description:
      'We measure our success by your multi-year trajectory — customer retention, transaction throughput, and team velocity. We stay actively invested in every line of code we ship.',
    rationale: 'Our longest-standing client relationships span multiple product lifecycles, global expansions, and high-value acquisitions.',
  },
];

export default function WhyZeeTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(`.${styles.principleCard}`);
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section id="manifesto" ref={sectionRef} className={`section ${styles.whySection}`}>
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={styles.sectionHeader}>
          <div className="label-eyebrow">
            <span className="label-dot" />
            <span>08 — WHY ZEETECH</span>
          </div>

          <h2 className={styles.headline}>
            Four core principles that govern{' '}
            <span className={styles.accentText}>every product we ship.</span>
          </h2>
          <p className={styles.subheadline}>
            Our operating philosophy guarantees consistency, engineering rigor, and uncompromised software quality across every client engagement.
          </p>
        </div>

        {/* 4 Principle Cards Grid */}
        <div ref={cardsRef} className={styles.principlesGrid}>
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.number} className={styles.principleCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.cardNumber}>{p.number}</span>
                </div>

                <div className={styles.takeawayBadge}>{p.takeaway}</div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.description}</p>

                <div className={styles.rationaleBox}>
                  <span className={styles.rationaleLabel}>ENGINEERING STANDARD:</span>
                  <p className={styles.rationaleText}>{p.rationale}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
