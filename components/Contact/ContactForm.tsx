'use client';

import React, { useState, useRef, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './Contact.module.css';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const serviceOptions = [
  'Web / SaaS Application',
  'Mobile App (iOS/Android)',
  'Fintech / Core System',
  'UI/UX & Product Design',
  'Cloud Architecture / DevOps',
  'AI / LLM Integration',
];

export default function ContactForm() {
  const [selectedService, setSelectedService] = useState('Web / SaaS Application');
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
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      company: (formData.get('company') as string) || '',
      phone: (formData.get('phone') as string) || '',
      helpWith: selectedService,
      budget: (formData.get('budget') as string) || 'Not sure yet',
      details: (formData.get('details') as string) || '',
      honeypot: (formData.get('website') as string) || '',
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
      <div className={styles.successState}>
        <div className={styles.successIconWrapper}>
          <CheckCircle2 size={36} className={styles.successIcon} />
        </div>
        <h4 className={styles.successTitle}>Inquiry Successfully Received</h4>
        <p className={styles.successDesc}>
          Thank you for reaching out. A senior technical architect has received your details and will get back to you within 24 business hours.
        </p>
        <a
          href={getWhatsAppUrl("Hi ZeeTech! I just submitted an inquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.successWhatsAppBtn}
        >
          <span>Need an immediate response? Chat on WhatsApp ↗</span>
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>
      {/* Service Type Selection */}
      <div className={styles.fieldGroup}>
        <label className={styles.inputLabel}>What type of project are you planning?</label>
        <div className={styles.servicePillsGrid}>
          {serviceOptions.map((svc) => (
            <button
              type="button"
              key={svc}
              onClick={() => setSelectedService(svc)}
              className={`${styles.servicePill} ${selectedService === svc ? styles.servicePillActive : ''}`}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Name & Work Email */}
      <div className={styles.inputRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-name" className={styles.inputLabel}>
            Full Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
            placeholder="e.g. Alexander Wright"
            disabled={status === 'loading'}
          />
          {fieldErrors.name && <span className={styles.errorText}>{fieldErrors.name}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.inputLabel}>
            Work Email <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
            placeholder="alexander@company.com"
            disabled={status === 'loading'}
          />
          {fieldErrors.email && <span className={styles.errorText}>{fieldErrors.email}</span>}
        </div>
      </div>

      {/* Row 2: Company & Budget */}
      <div className={styles.inputRow}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-company" className={styles.inputLabel}>
            Company / Organization
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className={styles.input}
            placeholder="Company Name (Optional)"
            disabled={status === 'loading'}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-budget" className={styles.inputLabel}>
            Estimated Budget Range
          </label>
          <select
            id="contact-budget"
            name="budget"
            className={styles.select}
            disabled={status === 'loading'}
          >
            <option value="Not sure yet">Not sure yet / Flexible</option>
            <option value="$10,000 – $25,000">$10,000 – $25,000 (MVP / Focused Build)</option>
            <option value="$25,000 – $50,000">$25,000 – $50,000 (Full Platform Release)</option>
            <option value="$50,000 – $100,000+">$50,000 – $100,000+ (Enterprise Scale)</option>
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-details" className={styles.inputLabel}>
          Project Scope & Goals <span className={styles.requiredStar}>*</span>
        </label>
        <textarea
          id="contact-details"
          name="details"
          required
          rows={3}
          className={`${styles.textarea} ${fieldErrors.details ? styles.inputError : ''}`}
          placeholder="Briefly describe what you're building, target timeline, or any technical requirements..."
          disabled={status === 'loading'}
        />
        {fieldErrors.details && <span className={styles.errorText}>{fieldErrors.details}</span>}
      </div>

      {/* Honeypot for Spam Prevention */}
      <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={styles.submitBtn}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className={styles.spinner} />
            <span>Transmitting Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Project Inquiry</span>
            <Send size={16} />
          </>
        )}
      </button>

      {/* Error Message */}
      {status === 'error' && (
        <div className={styles.formErrorBanner} role="alert">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
