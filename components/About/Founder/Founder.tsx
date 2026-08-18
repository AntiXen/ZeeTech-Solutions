'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Quote, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import styles from './Founder.module.css';

const CEO_IMAGE_URL = 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/CEO%20AMIT.png';

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textColRef.current,
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

      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
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

  return (
    <section id="about" ref={sectionRef} className={`section ${styles.founderSection}`}>
      <div className="section-container">
        <div className={styles.grid}>
          {/* Left Column: Narrative & Philosophy */}
          <div ref={textColRef} className={styles.textCol}>
            <div className="label-eyebrow">
              <span className="label-dot" />
              <span>07 — LEADERSHIP & PHILOSOPHY</span>
            </div>

            <h2 className={styles.headline}>
              Technology built with discipline.{' '}
              <span className={styles.accentText}>Led with clarity.</span>
            </h2>

            <blockquote className={styles.quoteCard}>
              <div className={styles.quoteIcon}>
                <Quote size={20} />
              </div>
              <p className={styles.quoteText}>
                “Everyone understands what to build, but very few understand why. True engineering leadership starts with the purpose behind the product.”
              </p>
            </blockquote>

            <div className={styles.narrativeBody}>
              <p className={styles.leadPara}>
                Great software isn’t just about writing efficient code. It’s about deeply understanding the business mechanics, human incentives, and technical risks before executing.
              </p>
              <p className={styles.para}>
                Anyone with access to modern tools can build an app. But building the right software — software that handles high transaction volume, remains secure under load, and scales seamlessly — requires experienced engineering judgment.
              </p>
              <p className={styles.para}>
                At ZeeTech, we don’t treat client projects like isolated tickets. We treat them as critical business assets where our reputation is on the line with every deployment.
              </p>
            </div>

            <div className={styles.founderCredentials}>
              <div className={styles.credItem}>
                <CheckCircle2 size={16} className={styles.credIcon} />
                <span>Hands-on architectural review on every client delivery</span>
              </div>
              <div className={styles.credItem}>
                <CheckCircle2 size={16} className={styles.credIcon} />
                <span>Zero outsourcing — core engineering led in-house</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Executive Card */}
          <div ref={imageColRef} className={styles.imageCol}>
            <div className={styles.portraitCard}>
              <div className={styles.imageFrame}>
                <Image
                  src={CEO_IMAGE_URL}
                  alt="Amit Ghosh — Founder and CEO, ZeeTech"
                  fill
                  className={styles.portraitImg}
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
                <div className={styles.imageVignette} />
                <div className={styles.verifiedTag}>
                  <span className={styles.verifiedDot} />
                  <span>Founder & Chief Architect</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div>
                  <h3 className={styles.founderName}>AMIT GHOSH</h3>
                  <p className={styles.founderRole}>Founder & CEO · ZeeTech Solutions</p>
                  <p className={styles.founderBase}>Dhaka, Bangladesh · Global Client Engagements</p>
                </div>

                <div className={styles.socialRow}>
                  <a
                    href="mailto:hello@zeetech.com"
                    className={styles.socialBtn}
                    aria-label="Email Amit Ghosh"
                    title="Direct Email"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href="#contact"
                    className={styles.bookConsultBtn}
                  >
                    <span>Consult with Amit</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
