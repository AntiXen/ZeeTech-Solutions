export const WHATSAPP_NUMBER = '+8801700000000'; // Replace with actual number
export const WHATSAPP_MESSAGE = 'Hello, I have a project idea I would like to discuss.';

export const getWhatsAppUrl = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};
