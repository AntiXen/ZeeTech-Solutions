'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import styles from './WhatsAppFAB.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling past ~400px (hero section)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={getWhatsAppUrl("Hello ZeeTech! I'd like to discuss a project inquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.fab} ${isVisible ? styles.visible : ''}`}
      aria-label="Chat directly with ZeeTech on WhatsApp"
      title="Direct WhatsApp Response"
    >
      <div className={styles.pulseRing} />
      <MessageSquare size={18} className={styles.icon} />
      <span className={styles.fabText}>WhatsApp Direct</span>
    </a>
  );
}
