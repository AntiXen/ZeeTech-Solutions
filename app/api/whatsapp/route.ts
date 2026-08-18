import { NextRequest, NextResponse } from 'next/server';

// Server-only phone number variable — never bundled into client JavaScript
const SECURE_WHATSAPP_NUMBER = process.env.WHATSAPP_PHONE_NUMBER || '8801852251100';
const DEFAULT_MESSAGE = 'Hello ZeeTech! I would like to discuss a project inquiry.';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const customMessage = searchParams.get('text') || DEFAULT_MESSAGE;
  const cleanPhone = SECURE_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;

  return NextResponse.redirect(waUrl, { status: 307 });
}
