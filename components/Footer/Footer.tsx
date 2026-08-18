'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Globe, Mail } from 'lucide-react';
import styles from './Footer.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const [dhakaTime, setDhakaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setDhakaTime(timeStr);
      } catch {
        setDhakaTime('UTC+6');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className={styles.footer}>
      <div className="section-container">
        {/* Top Callout Strip */}
        <div className={styles.topCallout}>
          <div className={styles.calloutLeft}>
            <div className={styles.calloutBadge}>
              <span className={styles.calloutDot} />
              <span>PARTNERSHIP OPPORTUNITY</span>
            </div>
            <h3 className={styles.calloutTitle}>Have an ambitious software project in mind?</h3>
            <p className={styles.calloutText}>
              We are currently accepting new client engagements for Q2 & Q3. Schedule a preliminary architecture review today.
            </p>
          </div>

          <div className={styles.calloutRight}>
            <Link href="#contact" className="btn-primary">
              <span>Start a Project Discussion</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Brand & Time Column */}
          <div className={styles.brandCol}>
            <Link href="#hero" className={styles.brandLogo}>
              ZeeTech<span className={styles.brandDot}>.</span>
            </Link>
            <p className={styles.brandBio}>
              Strategic Technology Partner for high-growth ventures and global enterprises. We architect, design, and build software that scales.
            </p>

            <div className={styles.locationCard}>
              <div className={styles.locationTop}>
                <Globe size={15} className={styles.locIcon} />
                <span className={styles.locCoords}>23.8103° N · 90.4125° E</span>
              </div>
              <div className={styles.locCity}>Dhaka, Bangladesh · Worldwide Operations</div>
              {dhakaTime && (
                <div className={styles.locTime}>
                  Local Time: <span className={styles.timeVal}>{dhakaTime} (BST/UTC+6)</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className={styles.linkCol}>
            <div className={styles.colHeading}>NAVIGATION</div>
            <ul className={styles.linksList}>
              <li><Link href="#work" className={styles.footerLink}>Selected Work</Link></li>
              <li><Link href="#capabilities" className={styles.footerLink}>Capabilities & Sprints</Link></li>
              <li><Link href="#build" className={styles.footerLink}>Architectural Catalog</Link></li>
              <li><Link href="#approach" className={styles.footerLink}>How We Operate</Link></li>
              <li><Link href="#about" className={styles.footerLink}>Leadership & Philosophy</Link></li>
              <li><Link href="#reviews" className={styles.footerLink}>Executive Perspectives</Link></li>
              <li><Link href="#technology" className={styles.footerLink}>Technology Index</Link></li>
            </ul>
          </div>

          {/* Core Disciplines Column */}
          <div className={styles.linkCol}>
            <div className={styles.colHeading}>DISCIPLINES</div>
            <ul className={styles.linksList}>
              <li><span className={styles.staticLink}>Event-Driven Microservices</span></li>
              <li><span className={styles.staticLink}>High-Converting SaaS Apps</span></li>
              <li><span className={styles.staticLink}>Cross-Platform Mobile Suites</span></li>
              <li><span className={styles.staticLink}>Enterprise ERP & Ledger Systems</span></li>
              <li><span className={styles.staticLink}>AI Agents & RAG Retrieval</span></li>
              <li><span className={styles.staticLink}>Cloud Infrastructure & CI/CD</span></li>
            </ul>
          </div>

          {/* Direct Connect Column */}
          <div className={styles.linkCol}>
            <div className={styles.colHeading}>DIRECT CONNECT</div>
            <ul className={styles.linksList}>
              <li>
                <a href="mailto:hello@zeetech.com" className={styles.footerLink}>
                  <Mail size={14} />
                  <span>hello@zeetech.com</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl("Hello ZeeTech! I'd like to discuss a project inquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  <span>WhatsApp Direct Response ↗</span>
                </a>
              </li>
              <li>
                <Link href="#contact" className={styles.footerLink}>
                  <span>Book Architecture Review →</span>
                </Link>
              </li>
            </ul>

            <div className={styles.ndaBadge}>
              <ShieldCheck size={16} className={styles.ndaIcon} />
              <span>Mutual NDA Protected Client Engagements</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} ZeeTech Solutions. All rights reserved. Precision software engineering for ambitious companies.
          </div>
          <div className={styles.legalLinks}>
            <span className={styles.legalTag}>Type-Safe · Event-Driven · Cloud-Native</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
