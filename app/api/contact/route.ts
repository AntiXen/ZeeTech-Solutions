import { NextResponse } from 'next/server';
import { validateContactForm, type ContactFormData } from '@/lib/validation';
import { sendContactEmail } from '@/lib/contact';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();

    // Check body size (prevent abuse)
    const bodyStr = JSON.stringify(body);
    if (bodyStr.length > 10000) {
      return NextResponse.json(
        { error: 'Request body too large.' },
        { status: 413 }
      );
    }

    const formData: ContactFormData = {
      name: String(body.name || ''),
      email: String(body.email || ''),
      company: String(body.company || ''),
      phone: String(body.phone || ''),
      helpWith: String(body.helpWith || ''),
      budget: String(body.budget || ''),
      details: String(body.details || ''),
      honeypot: String(body.honeypot || ''),
    };

    // Validate
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed.', errors: validation.errors },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendContactEmail(formData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send message.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
