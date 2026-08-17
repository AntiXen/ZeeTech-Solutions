'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#approach', label: 'Approach' },
  { href: '#about', label: 'About' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = links.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Handle body scroll and inert for accessibility
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Fallback for accessibility if main element is not specifically structured
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('inert', '');
      }
    } else {
      document.body.style.overflow = '';
      const main = document.querySelector('main');
      if (main) {
        main.removeAttribute('inert');
      }
    }

    return () => {
      document.body.style.overflow = '';
      const main = document.querySelector('main');
      if (main) {
        main.removeAttribute('inert');
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="#" className={styles.brand} onClick={closeMenu}>
          ZeeTech
        </Link>

        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className={styles.activeIndicator}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <Link href="#contact" className={styles.cta}>
            Start a conversation
          </Link>
        </div>

        <div className={styles.mobileNav}>
          <button
            className={styles.menuBtn}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            style={{ position: isMenuOpen ? 'relative' : 'static' }}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
          >
            <div className={styles.mobileMenuInner}>
              <div className={styles.mobileLinks}>
                {[...links, { href: '#contact', label: 'Contact' }].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className={styles.mobileDivider} />
              <a
                href={getWhatsAppUrl()}
                className={styles.mobileContact}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                WhatsApp — Instant response ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
