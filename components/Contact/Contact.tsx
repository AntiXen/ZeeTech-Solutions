'use client';

import React, { useRef, useEffect } from 'react';
import { Mail, ShieldCheck, Clock, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 30 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={`section ${styles.contactSection}`}>
      <div className="section-container">
        <div className={styles.grid}>
          {/* Left Column: Narrative, SLA & Trust */}
          <div ref={leftColRef} className={styles.leftCol}>
            <div className="label-eyebrow">
              <span className="label-dot" />
              <span>11 — START A CONVERSATION</span>
            </div>

            <h2 className={styles.headline}>
              Let’s architect software that{' '}
              <span className={styles.accentText}>moves the needle.</span>
            </h2>

            <p className={styles.subtext}>
              Tell us about your venture, challenge, or upcoming software milestone. A senior technical architect will review your inquiry and schedule a high-signal discovery call.
            </p>

            {/* SLA & Engagement Guarantees */}
            <div className={styles.guaranteesBox}>
              <div className={styles.guaranteeItem}>
                <Clock size={18} className={styles.guaranteeIcon} />
                <div>
                  <div className={styles.guaranteeTitle}>24-Hour SLA Response</div>
                  <div className={styles.guaranteeDesc}>Guaranteed response from a senior partner within 1 business day.</div>
                </div>
              </div>

              <div className={styles.guaranteeItem}>
                <ShieldCheck size={18} className={styles.guaranteeIcon} />
                <div>
                  <div className={styles.guaranteeTitle}>Strict Mutual NDA</div>
                  <div className={styles.guaranteeDesc}>Your IP, data, and business concepts remain 100% confidential.</div>
                </div>
              </div>

              <div className={styles.guaranteeItem}>
                <CheckCircle2 size={18} className={styles.guaranteeIcon} />
                <div>
                  <div className={styles.guaranteeTitle}>No-Obligation Technical Feasibility</div>
                  <div className={styles.guaranteeDesc}>Pragmatic architectural feedback and estimated timeline upfront.</div>
                </div>
              </div>
            </div>

            {/* Direct Contact Meta */}
            <div className={styles.directContactStrip}>
              <div className={styles.directItem}>
                <span className={styles.directLabel}>DIRECT EMAIL</span>
                <a href="mailto:hello@zeetech.com" className={styles.directLink}>
                  <Mail size={15} />
                  <span>hello@zeetech.com</span>
                </a>
              </div>

              <div className={styles.directItem}>
                <span className={styles.directLabel}>TIMEZONE / REGION</span>
                <span className={styles.directVal}>Dhaka (UTC+6) · Global Client Overlap</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Project Inquiry Form */}
          <div ref={rightColRef} className={styles.rightCol}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Project Inquiry & Architecture Review</h3>
                <p className={styles.formSubtitle}>Fill out the brief below or connect instantly on WhatsApp.</p>
              </div>

              <ContactForm />

              {/* Instant WhatsApp Alternative */}
              <div className={styles.whatsappAlternative}>
                <div className={styles.dividerRow}>
                  <div className={styles.dividerLine} />
                  <span className={styles.dividerText}>or connect instantly</span>
                  <div className={styles.dividerLine} />
                </div>

                <a
                  href={getWhatsAppUrl("Hello ZeeTech! I'd like to discuss a project inquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappDirectBtn}
                >
                  <MessageSquare size={16} />
                  <span>Chat directly with ZeeTech on WhatsApp</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
