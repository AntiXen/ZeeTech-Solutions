'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import styles from './Hero.module.css';
import SignalCanvas from '@/components/Signal/SignalCanvas';

const metrics = [
  { value: 'Sub-50ms', label: 'Engineered Latency', sub: 'Event-driven systems' },
  { value: '100%', label: 'Delivery Integrity', sub: 'Production-ready code' },
  { value: '$250M+', label: 'Volume Supported', sub: 'Across client platforms' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.1 }
      )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          metricsRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          trustBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );

      // Subtle parallax on scroll
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          y: -50,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.heroSection}>
      <SignalCanvas />

      <div className="section-container">
        <div ref={contentRef} className={styles.heroContent}>
          {/* Eyebrow badge */}
          <div className={styles.eyebrowWrapper}>
            <div className="label-eyebrow">
              <span className={`label-dot ${styles.bannerDot}`} />
              <span>STRATEGIC TECHNOLOGY & ENGINEERING PARTNER</span>
            </div>
          </div>

          {/* Primary Headline */}
          <h1 ref={headlineRef} className={styles.headline}>
            We build technology that moves businesses{' '}
            <span className={styles.accentText}>forward.</span>
          </h1>

          {/* Value proposition subtext */}
          <p ref={subtextRef} className={styles.subtext}>
            From architecture and full-stack software development to product design and continuous evolution — ZeeTech helps ambitious companies turn complex problems into reliable, high-converting technology.
          </p>

          {/* Action CTAs */}
          <div ref={ctaGroupRef} className={styles.ctaGroup}>
            <Link href="#contact" className="btn-primary">
              <span>Start a Conversation</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="#work" className="btn-secondary">
              <span>Explore Selected Work</span>
            </Link>
          </div>

          {/* Key Outcome Metrics Strip */}
          <div ref={metricsRef} className={styles.metricsStrip}>
            {metrics.map((item, idx) => (
              <div key={idx} className={styles.metricCard}>
                <div className={styles.metricValue}>{item.value}</div>
                <div className={styles.metricLabel}>{item.label}</div>
                <div className={styles.metricSub}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Engineering Standards Trust Bar */}
          <div ref={trustBarRef} className={styles.trustBar}>
            <div className={styles.trustItem}>
              <ShieldCheck size={16} className={styles.trustIcon} />
              <span>Enterprise-Grade Security</span>
            </div>
            <div className={styles.trustDot}>·</div>
            <div className={styles.trustItem}>
              <Zap size={16} className={styles.trustIcon} />
              <span>Event-Driven Architecture</span>
            </div>
            <div className={styles.trustDot}>·</div>
            <div className={styles.trustItem}>
              <Layers size={16} className={styles.trustIcon} />
              <span>Cloud-Native Scalability</span>
            </div>
            <div className={styles.trustDot}>·</div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} className={styles.trustIcon} />
              <span>Long-Term Product Ownership</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className={styles.scrollIndicator}>
        <a href="#proposition" aria-label="Scroll to Brand Proposition" className={styles.scrollLink}>
          <span className={styles.scrollLabel}>SCROLL TO EXPLORE</span>
          <ChevronDown size={18} className={styles.scrollArrow} />
        </a>
      </div>
    </section>
  );
}
