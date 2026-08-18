export const WHATSAPP_NUMBER = '+8801700000000'; // Replace with actual number
export const WHATSAPP_MESSAGE = 'Hello, I have a project idea I would like to discuss.';

export const getWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage || WHATSAPP_MESSAGE;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};
