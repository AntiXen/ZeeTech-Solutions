/**
 * Contact form validation
 */

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  helpWith: string;
  budget: string;
  details: string;
  honeypot: string; // spam protection — must be empty
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot check
  if (data.honeypot) {
    return { valid: false, errors: { honeypot: 'Spam detected.' } };
  }

  // Name
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name is too long.';
  }

  // Email
  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // Company — optional, no validation needed

  // Phone — optional, no strict validation

  // Help with
  if (!data.helpWith || data.helpWith.trim().length < 3) {
    errors.helpWith = 'Please tell us what you need help with.';
  }

  // Details
  if (!data.details || data.details.trim().length < 10) {
    errors.details = 'Please share a few more details about your project.';
  } else if (data.details.length > 5000) {
    errors.details = 'Message is too long (maximum 5,000 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
