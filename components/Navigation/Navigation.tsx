'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

const navLinks = [
  { href: '#work', label: 'Work', id: 'work' },
  { href: '#capabilities', label: 'Capabilities', id: 'capabilities' },
  { href: '#approach', label: 'Approach', id: 'approach' },
  { href: '#about', label: 'About', id: 'about' },
];

const allSectionIds = ['hero', 'proposition', 'capabilities', 'build', 'work', 'approach', 'about', 'manifesto', 'technology', 'contact'];

function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.themeToggle} ${className || ''}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.svg
            key="sun"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
      { rootMargin: '-30% 0px -50% 0px' }
    );

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      allSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Handle body scroll and inert for accessibility
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
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
    setIsMenuOpen((prev) => !prev);
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
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

          {/* Theme Switcher */}
          <ThemeToggleButton />

          <Link 
            href="#contact" 
            className={`${styles.cta} ${activeSection === 'contact' ? styles.ctaActive : ''}`}
          >
            Start a conversation
          </Link>
        </div>

        <div className={styles.mobileNav}>
          <ThemeToggleButton className={styles.mobileThemeToggle} />
          <button
            className={styles.menuBtn}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
                {[...navLinks, { href: '#contact', label: 'Contact', id: 'contact' }].map((link) => (
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
              
              <div className={styles.mobileMenuBottom}>
                <a
                  href={getWhatsAppUrl()}
                  className={styles.mobileContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  WhatsApp — Instant response ↗
                </a>
                <span className={styles.mobileThemeLabel}>
                  Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
