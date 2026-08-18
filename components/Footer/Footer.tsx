import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="section-container">
        <div className={styles.topSection}>
          <div>
            <div className={styles.brandName}>ZeeTech</div>
            <div className={styles.brandTagline}>Innovate. Build. Grow.</div>
            <div className={styles.brandDesc}>
              ZeeTech is a software development and technology partner based in Dhaka, Bangladesh — building products for clients worldwide.
            </div>
          </div>
          
          <div className={styles.navLinks}>
            <Link href="#work" className={styles.link}>Work</Link>
            <Link href="#capabilities" className={styles.link}>Capabilities</Link>
            <Link href="#approach" className={styles.link}>Approach</Link>
            <Link href="#about" className={styles.link}>About</Link>
            <Link href="#contact" className={styles.link}>Contact</Link>
          </div>
          
          <div className={styles.contactLinks}>
            <a href="mailto:hello@zeetech.com" className={styles.link}>hello@zeetech.com</a>
            <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer" className={styles.link}>WhatsApp Direct ↗</a>
            <span className={styles.link} style={{ cursor: 'default' }}>Dhaka, Bangladesh</span>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          </div>
        </div>

        <div className={`${styles.divider} ${styles.bottomDivider}`}></div>
        
        <div className={styles.copyright}>
          © 2026 ZeeTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
