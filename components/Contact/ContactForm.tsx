'use client';

import React, { useState, useRef, FormEvent } from 'react';
import styles from './Contact.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      helpWith: formData.get('helpWith') as string,
      budget: formData.get('budget') as string,
      details: formData.get('details') as string,
      honeypot: formData.get('website') as string || '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMsg}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.successText}>
          Message received.<br />
          We&apos;ll get back to you within one business day.
        </div>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.successWhatsApp}>
          Prefer an instant response? → WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>
      <div className={styles.formLabel}>Tell us about your project</div>
      
      <div className={styles.inputRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-name" className={styles.inputLabel}>Name</label>
          <input id="contact-name" name="name" type="text" required className={styles.input} placeholder="Jane Doe" />
          {fieldErrors.name && <span className={styles.fieldError}>{fieldErrors.name}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.inputLabel}>Work email</label>
          <input id="contact-email" name="email" type="email" required className={styles.input} placeholder="jane@company.com" />
          {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
        </div>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-company" className={styles.inputLabel}>Company</label>
          <input id="contact-company" name="company" type="text" className={styles.input} placeholder="Company Name" />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-budget" className={styles.inputLabel}>Approximate budget</label>
          <select id="contact-budget" name="budget" className={styles.select}>
            <option value="Not sure yet">Not sure yet</option>
            <option value="Under $5,000">Under $5,000</option>
            <option value="$5,000 – $15,000">$5,000 – $15,000</option>
            <option value="$15,000 – $50,000">$15,000 – $50,000</option>
            <option value="$50,000+">$50,000+</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-details" className={styles.inputLabel}>Project details</label>
        <textarea id="contact-details" name="details" required rows={3} className={styles.textarea} placeholder="Tell us about the problem or project..." />
        {fieldErrors.details && <span className={styles.fieldError}>{fieldErrors.details}</span>}
      </div>

      {/* Honeypot */}
      <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
        {status === 'loading' ? 'Sending...' : 'Send project inquiry'}
      </button>

      {status === 'error' && (
        <div className={styles.errorMsg} role="alert">{errorMessage}</div>
      )}
    </form>
  );
}
