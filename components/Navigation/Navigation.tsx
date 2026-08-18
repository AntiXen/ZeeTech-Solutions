'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import styles from './Navigation.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { useTheme } from '@/components/shared/ThemeProvider/ThemeProvider';

const navLinks = [
  { href: '#work', label: 'Selected Work', id: 'work' },
  { href: '#capabilities', label: 'Capabilities', id: 'capabilities' },
  { href: '#approach', label: 'Approach', id: 'approach' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#reviews', label: 'Perspectives', id: 'reviews' },
];

const allSectionIds = ['hero', 'proposition', 'capabilities', 'build', 'work', 'approach', 'about', 'manifesto', 'reviews', 'technology', 'contact'];

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
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className={styles.themeIconWrapper}
          >
            <Sun size={17} strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className={styles.themeIconWrapper}
          >
            <Moon size={17} strokeWidth={2} />
          </motion.div>
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
      setIsScrolled(window.scrollY > 40);
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
      { rootMargin: '-25% 0px -45% 0px' }
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
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navBar} aria-label="Main navigation">
        {/* Brand & Live Status */}
        <div className={styles.brandWrapper}>
          <Link href="#hero" className={styles.brand} onClick={closeMenu}>
            <span className={styles.brandLogo}>ZeeTech</span>
            <span className={styles.brandDot} />
          </Link>
          <div className={styles.availabilityPill}>
            <span className={styles.livePulse} />
            <span className={styles.availabilityText}>Available for Projects</span>
          </div>
        </div>

        {/* Desktop Links */}
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
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className={styles.navActions}>
            <ThemeToggleButton />
            <Link 
              href="#contact" 
              className={styles.ctaButton}
            >
              <span>Start a Project</span>
              <ArrowUpRight size={15} className={styles.ctaIcon} />
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className={styles.mobileNav}>
          <ThemeToggleButton className={styles.mobileThemeToggle} />
          <button
            className={styles.menuBtn}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className={styles.mobileMenuInner}>
              <div className={styles.mobileLinks}>
                {[...navLinks, { href: '#contact', label: 'Start a Project', id: 'contact' }].map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileLink} ${activeSection === link.id ? styles.mobileActiveLink : ''}`}
                      onClick={closeMenu}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} className={styles.mobileLinkArrow} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className={styles.mobileDivider} />
              
              <div className={styles.mobileMenuBottom}>
                <a
                  href={getWhatsAppUrl("Hello ZeeTech! I'd like to discuss a project inquiry.")}
                  className={styles.mobileContactBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <Sparkles size={16} />
                  <span>WhatsApp Direct Response ↗</span>
                </a>
                <div className={styles.mobileLocation}>
                  <span>Dhaka · Worldwide Delivery (UTC+6)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
