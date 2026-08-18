'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';
import PinnedScene from '@/components/shared/PinnedScene/PinnedScene';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

function ContactSceneContent({ progress }: { progress: MotionValue<number> }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = useTransform(
    progress,
    [0.08, 0.4],
    [isDark ? '#555555' : '#8E8E98', isDark ? '#22C55E' : '#FF5500']
  );

  return (
    <div className={styles.sceneContainer}>
      <motion.div 
        className={styles.backgroundSignal}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 800 800" className={styles.signalSvg}>
          <circle cx="400" cy="400" r="320" stroke="var(--accent)" strokeOpacity="0.08" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="220" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="140" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" fill="none" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="60" fill="url(#contactGlow)" />
          <defs>
            <radialGradient id="contactGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Column: Heading & Editorial Narrative */}
          <div className={styles.leftCol}>
            <span className={styles.label}>
              <span className={styles.accent}>11</span> — START A CONVERSATION
            </span>

            <h2 className={styles.headline}>
              Let&apos;s build something that <motion.span style={{ color: accentColor }}>moves the needle.</motion.span>
            </h2>

            <p className={styles.supporting}>
              Tell us what you&apos;re working on. We&apos;ll help figure out what comes next.
            </p>

            <p className={styles.mutedText}>
              Whether you have a complete technical specification or just a rough idea — we&apos;re ready to listen, challenge, and build.
            </p>
          </div>

          {/* Right Column: Project Inquiry Form Card */}
          <div className={styles.rightCol}>
            <ContactForm />

            <div className={styles.whatsAppDivider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>or</span>
              <div className={styles.dividerLine} />
            </div>

            <div className={styles.whatsappWrapper}>
              <span className={styles.whatsappPrompt}>Need an immediate response?</span>
              <a
                href={getWhatsAppUrl("Hello ZeeTech! I'd like to discuss a project inquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <span>Chat with ZeeTech on WhatsApp</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { theme } = useTheme();
  return (
    <PinnedScene id="contact" trackHeight="160vh">
      {(progress) => <ContactSceneContent key={theme} progress={progress} />}
    </PinnedScene>
  );
}
