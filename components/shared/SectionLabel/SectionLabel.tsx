import React from 'react';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  number: string;
  text: string;
}

export function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <div className={styles.container}>
      <span className={styles.number}>{number}</span>
      <span className={styles.separator}>—</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
