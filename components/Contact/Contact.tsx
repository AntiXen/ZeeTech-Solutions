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
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  width="17" 
                  height="17"
                  className={styles.whatsappIcon}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
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
