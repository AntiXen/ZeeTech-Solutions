export const getWhatsAppUrl = (customMessage?: string) => {
  if (customMessage) {
    return `/api/whatsapp?text=${encodeURIComponent(customMessage)}`;
  }
  return '/api/whatsapp';
};
