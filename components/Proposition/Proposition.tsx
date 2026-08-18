'use client';

import React, { useRef, useEffect } from 'react';
import { Briefcase, Cpu, Lightbulb, Compass, Handshake } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './Proposition.module.css';

const pillars = [
  {
    num: '01',
    title: 'Deep Business Understanding',
    icon: Briefcase,
    description: 'We reverse-engineer the business model, unit economics, and operational bottlenecks before writing a line of code.',
    highlight: 'No blind coding'
  },
  {
    num: '02',
    title: 'Rigorous Product Thinking',
    icon: Lightbulb,
    description: 'We challenge unclear assumptions and refine features down to what genuinely drives retention, conversion, and market advantage.',
    highlight: 'High-signal UX'
  },
  {
    num: '03',
    title: 'World-Class Technical Architecture',
    icon: Cpu,
    description: 'Event-driven services, type-safe codebases, resilient data pipelines, and cloud-native infrastructure engineered to scale.',
    highlight: 'Sub-50ms speed'
  },
  {
    num: '04',
    title: 'Strategic Consultation & Clarity',
    icon: Compass,
    description: 'Honest roadmaps, transparent trade-offs, and pragmatic technical advice from senior engineering leaders who care about your ROI.',
    highlight: 'Executive alignment'
  },
  {
    num: '05',
    title: 'Long-Term Collaborative Partnership',
    icon: Handshake,
    description: 'We don’t abandon you after launch. We monitor, optimize, and iterate alongside your team as your user base expands.',
    highlight: 'Continuous growth'
  }
];

export default function Proposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animate left column
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger right column cards
      const cards = cardsRef.current?.querySelectorAll(`.${styles.pillarCard}`);
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
    <section id="proposition" ref={sectionRef} className={`section ${styles.propositionSection}`}>
      <div className="section-container">
        <div className={styles.grid}>
          {/* Left: Editorial Thesis */}
          <div ref={leftColRef} className={styles.leftCol}>
            <div className="label-eyebrow">
              <span className="label-dot" />
              <span>02 — BRAND PROPOSITION</span>
            </div>

            <h2 className={styles.headline}>
              You bring the <span className={styles.accentText}>ambition.</span><br />
              We engineer the <span className={styles.accentSecondary}>technology.</span>
            </h2>

            <div className={styles.bodyText}>
              <p className={styles.leadParagraph}>
                Most software projects fail or drift because the development team is merely waiting for instructions. At ZeeTech, we operate as a proactive technical co-founder.
              </p>
              <p className={styles.paragraph}>
                We delve into the business model behind the build, challenge weak assumptions before they turn into costly technical debt, and engineer software that stands the test of real-world volume.
              </p>
              <p className={styles.paragraph}>
                You don’t need a 100-page specification to start. Bring us the ambition, the problem, or the opportunity. We’ll architect the solution.
              </p>
            </div>

            <div className={styles.quoteBox}>
              <div className={styles.quoteAuthor}>OUR CORE PROMISE</div>
              <div className={styles.quoteStatement}>
                “If it ships under our name, we stand behind its performance, security, and scalability 24/7/365.”
              </div>
            </div>
          </div>

          {/* Right: 5 Value Pillars */}
          <div ref={cardsRef} className={styles.rightCol}>
            <div className={styles.pillarsHeader}>
              <span className={styles.pillarsSubtitle}>WHAT PARTNERING WITH ZEETECH DELIVERS</span>
            </div>

            <div className={styles.pillarsList}>
              {pillars.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.num} className={styles.pillarCard}>
                    <div className={styles.pillarTop}>
                      <div className={styles.pillarMeta}>
                        <span className={styles.pillarNumber}>{item.num}</span>
                        <div className={styles.pillarIcon}>
                          <IconComponent size={18} />
                        </div>
                      </div>
                      <span className={styles.pillarBadge}>{item.highlight}</span>
                    </div>

                    <h3 className={styles.pillarTitle}>{item.title}</h3>
                    <p className={styles.pillarDescription}>{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
