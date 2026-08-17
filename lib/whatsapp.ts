/**
 * WhatsApp link utility
 * Constructs the correct wa.me URL from environment variables.
 */

export function getWhatsAppUrl(): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || '';
  
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanNumber}${message ? `?text=${encodedMessage}` : ''}`;
}

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
}
