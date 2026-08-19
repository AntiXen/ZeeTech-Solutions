/**
 * Contact email delivery via Resend
 */

import type { ContactFormData } from './validation';

interface SendResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'noreply@github.com';

  if (!apiKey) {
    console.log('Contact inquiry received (Dev/Demo mode):', {
      to: toEmail,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      service: data.helpWith,
      budget: data.budget,
      details: data.details,
    });
    // Return success in demo/dev mode so user flow is uninterrupted
    return { success: true };
  }

  try {
    // Send inquiry notification to ZeeTech
    const inquiryResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZeeTech Website <onboarding@resend.dev>',
        to: [toEmail],
        subject: `New Project Inquiry from ${data.name}`,
        html: buildInquiryEmail(data),
      }),
    });

    if (!inquiryResponse.ok) {
      const err = await inquiryResponse.text();
      console.error('Resend inquiry error:', err);
      return { success: false, error: 'Failed to send inquiry.' };
    }

    // Send auto-reply confirmation to client
    const confirmResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZeeTech <onboarding@resend.dev>',
        to: [data.email],
        subject: 'We received your project inquiry — ZeeTech',
        html: buildConfirmationEmail(data.name),
      }),
    });

    if (!confirmResponse.ok) {
      // Non-critical — inquiry was already sent
      console.error('Resend confirmation error:', await confirmResponse.text());
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

function buildInquiryEmail(data: ContactFormData): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #333;">
      <h2 style="color: #080808; margin-bottom: 24px;">New Project Inquiry</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 140px; vertical-align: top;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        ${data.company ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.company)}</td>
        </tr>` : ''}
        ${data.phone ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Phone / WhatsApp</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.phone)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Needs help with</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.helpWith)}</td>
        </tr>
        ${data.budget ? `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; vertical-align: top;">Budget</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.budget)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 12px 0; font-weight: 600; vertical-align: top;">Details</td>
          <td style="padding: 12px 0; white-space: pre-wrap;">${escapeHtml(data.details)}</td>
        </tr>
      </table>
      
      <p style="margin-top: 32px; font-size: 13px; color: #999;">
        Sent from zeetech.com contact form
      </p>
    </div>
  `;
}

function buildConfirmationEmail(name: string): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const whatsappMessage = encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || '');
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}${whatsappMessage ? `?text=${whatsappMessage}` : ''}`
    : '';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 540px; color: #333;">
      <h2 style="color: #080808; margin-bottom: 8px;">Thanks for reaching out, ${escapeHtml(name)}.</h2>
      
      <p style="font-size: 16px; line-height: 1.65; color: #555; margin-bottom: 24px;">
        We've received your project inquiry and will get back to you within one business day.
      </p>
      
      ${whatsappUrl ? `
      <p style="font-size: 14px; line-height: 1.6; color: #777; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
        Need a faster response?<br>
        <a href="${whatsappUrl}" style="color: #10B981; text-decoration: none; font-weight: 600;">Chat with ZeeTech on WhatsApp →</a>
      </p>
      ` : ''}
      
      <p style="margin-top: 40px; font-size: 13px; color: #bbb;">
        ZeeTech — Strategic Technology Partner<br>
        Dhaka, Bangladesh · Worldwide
      </p>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
