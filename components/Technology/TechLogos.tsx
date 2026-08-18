'use client';

import React from 'react';

export function TechLogo({ name }: { name: string }) {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 115 102" width="22" height="20" fill="none">
          <ellipse cx="57.5" cy="51" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" />
          <ellipse cx="57.5" cy="51" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 57.5 51)" />
          <ellipse cx="57.5" cy="51" rx="55" ry="20" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 57.5 51)" />
          <circle cx="57.5" cy="51" r="10" fill="#61DAFB" />
        </svg>
      );

    case 'Next.js':
      return (
        <svg viewBox="0 0 180 180" width="20" height="20" fill="none">
          <circle cx="90" cy="90" r="90" fill="#000" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M149.5 163.5L75.5 68H58V124H70.5V84.5L138 171C142.2 168.8 146.1 166.3 149.5 163.5Z" fill="#FFFFFF" />
          <path d="M122 68H109.5V107.5L122 123.5V68Z" fill="#FFFFFF" />
        </svg>
      );

    case 'Flutter':
      return (
        <svg viewBox="0 0 166 202" width="18" height="22" fill="none">
          <path d="M102.5 0L0 102.5L31.8 134.3L166 0H102.5Z" fill="#47C5FB" />
          <path d="M102.5 102.5L47.7 157.3L79.5 189.1L134.3 134.3L166 102.5H102.5Z" fill="#02569B" />
          <path d="M47.7 157.3L79.5 125.5L111.3 157.3L79.5 189.1L47.7 157.3Z" fill="#0175C2" />
        </svg>
      );

    case 'TypeScript':
      return (
        <svg viewBox="0 0 128 128" width="20" height="20" fill="none">
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path d="M63 43H25V55H38V103H50V55H63V43Z" fill="#FFFFFF" />
          <path d="M96 61C96 52 87 46 76 46C65 46 58 53 58 63C58 83 95 73 95 91C95 96 90 100 82 100C72 100 66 94 65 86H53C54 99 64 110 82 110C98 110 108 101 108 89C108 70 70 79 70 62C70 58 74 55 80 55C86 55 91 58 92 61H96Z" fill="#FFFFFF" />
        </svg>
      );

    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#38BDF8">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );

    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" width="16" height="22" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      );

    case 'Node.js':
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" fill="#5FA04E">
          <path d="M16 1.5L2.5 9.3v15.6L16 32.7l13.5-7.8V9.3L16 1.5zm11.5 22.3L16 30.3 4.5 23.8V10.2L16 3.7l11.5 6.5v13.6z" />
          <path d="M14.5 10.5h3v11h-3zM9.5 14h3v7.5h-3zM19.5 14h3v7.5h-3z" />
        </svg>
      );

    case 'Python':
      return (
        <svg viewBox="0 0 110 110" width="22" height="22" fill="none">
          <path d="M54.5 0C25 0 26.8 12.8 26.8 12.8L26.9 26.1H55.4V30.1H15.9C15.9 30.1 0 28.3 0 57.6C0 87 13.9 85.5 13.9 85.5H22.2V73.8C22.2 73.8 21.7 59.8 36 59.8H64.3C64.3 59.8 77.8 60.3 77.8 47.1V13.3C77.8 13.3 80.2 0 54.5 0ZM41.8 8.7C45.3 8.7 48.1 11.5 48.1 15C48.1 18.5 45.3 21.3 41.8 21.3C38.3 21.3 35.5 18.5 35.5 15C35.5 11.5 38.3 8.7 41.8 8.7Z" fill="#3776AB" />
          <path d="M55.5 110C85 110 83.2 97.2 83.2 97.2L83.1 83.9H54.6V79.9H94.1C94.1 79.9 110 81.7 110 52.4C110 23 96.1 24.5 96.1 24.5H87.8V36.2C87.8 36.2 88.3 50.2 74 50.2H45.7C45.7 50.2 32.2 49.7 32.2 62.9V96.7C32.2 96.7 29.8 110 55.5 110ZM68.2 101.3C64.7 101.3 61.9 98.5 61.9 95C61.9 91.5 64.7 88.7 68.2 88.7C71.7 88.7 74.5 91.5 74.5 95C74.5 98.5 71.7 101.3 68.2 101.3Z" fill="#FFD43B" />
        </svg>
      );

    case 'Go':
      return (
        <svg viewBox="0 0 24 24" width="24" height="18" fill="#00ADD8">
          <path d="M1.8 9.5h3.4v1.2H1.8zm0 2.4h2.2v1.2H1.8zm0 2.4h3.4v1.2H1.8zm7.3-6.5c-3.1 0-5.3 2.1-5.3 5.3s2.1 5.3 5.3 5.3c2.4 0 4.2-1.3 4.9-3.3h-4.9v-2.1h7.3c.1.5.1 1 .1 1.6 0 4.5-3.1 7.2-7.4 7.2C4.1 18.9 1 15.3 1 10.7S4.1 2.5 9.1 2.5c3.2 0 5.6 1.4 6.9 3.5l-2.6 1.5c-.9-1.2-2.3-1.9-4.3-1.9zm10.7 0c-3.1 0-5.4 2.3-5.4 5.4 0 3.1 2.3 5.4 5.4 5.4s5.4-2.3 5.4-5.4c0-3.1-2.3-5.4-5.4-5.4zm0 2.4c1.7 0 2.9 1.3 2.9 3s-1.2 3-2.9 3-2.9-1.3-2.9-3 1.2-3 2.9-3z" />
        </svg>
      );

    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 128 128" width="22" height="22" fill="none">
          <path d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4z" fill="#336791" />
          <path d="M64 24c-19 0-33 13-33 30 0 12 7 21 16 26v18l12-8h5c19 0 33-13 33-30s-14-36-33-36zm-8 44c-4 0-8-3-8-8s4-8 8-8 8 3 8 8-4 8-8 8zm24 0c-4 0-8-3-8-8s4-8 8-8 8 3 8 8-4 8-8 8z" fill="#FFFFFF" />
        </svg>
      );

    case 'Redis':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#DC382D">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.3 19.5 7 12 10.5zM2 12l10 5 10-5v-2l-10 5-10-5v2zm0 5l10 5 10-5v-2l-10 5-10-5v2z" />
        </svg>
      );

    case 'GraphQL':
      return (
        <svg viewBox="0 0 400 400" width="22" height="22" fill="none">
          <path d="M57.468 300L200 382.288 342.532 300 342.532 135.424 200 53.136 57.468 135.424z" stroke="#E10098" strokeWidth="20" />
          <path d="M200 53.136L342.532 300 57.468 300z" stroke="#E10098" strokeWidth="20" />
          <circle cx="200" cy="53" r="28" fill="#E10098" />
          <circle cx="343" cy="135" r="28" fill="#E10098" />
          <circle cx="343" cy="300" r="28" fill="#E10098" />
          <circle cx="200" cy="382" r="28" fill="#E10098" />
          <circle cx="57" cy="300" r="28" fill="#E10098" />
          <circle cx="57" cy="135" r="28" fill="#E10098" />
        </svg>
      );

    case 'REST APIs':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="2">
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="18" y1="9" x2="18" y2="15" />
          <circle cx="6" cy="6" r="1" fill="#22C55E" />
          <circle cx="6" cy="18" r="1" fill="#22C55E" />
        </svg>
      );

    case 'AWS':
      return (
        <svg viewBox="0 0 24 24" width="24" height="20" fill="#FF9900">
          <path d="M12.5 15.6c-3.1 0-5.8-1.2-7.8-3.1-.3-.3-.2-.7.2-.9.4-.2.8-.1 1.1.2 1.7 1.6 4.1 2.6 6.6 2.6 3.1 0 5.9-1.5 7.4-3.8.3-.4.7-.5 1-.2.4.3.4.7.1 1.1-1.9 2.5-5.1 4.1-8.6 4.1zm8.3-4.2c-.3.4-.9.5-1.3.2l-1.6-1.1c-.4-.3-.5-.9-.2-1.3.3-.4.9-.5 1.3-.2l1.6 1.1c.4.3.5.9.2 1.3zM6.8 8.8h1.8L10 13.5l1.4-4.7h1.8l-2.3 6.9h-1.8L6.8 8.8z" />
        </svg>
      );

    case 'GCP':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
        </svg>
      );

    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" width="24" height="20" fill="#2496ED">
          <path d="M13.9 9.8h-2.1V7.7h2.1v2.1zm-2.7 0H9.1V7.7h2.1v2.1zm-2.7 0H6.4V7.7h2.1v2.1zm8.1 0h-2.1V7.7h2.1v2.1zm-8.1-2.7H6.4V5h2.1v2.1zm2.7 0H9.1V5h2.1v2.1zm2.7 0h-2.1V5h2.1v2.1zm2.7 0h-2.1V5h2.1v2.1zm7.8 4.7c-.5-.4-1.5-.5-2.3-.2-.2-.6-.6-1.2-1.2-1.6l-.7-.4-.4.7c-.4.7-.6 1.6-.4 2.5-.5.3-1.4.3-2.1.2H1.3c-.5 2.1.2 4.4 1.7 6 1.7 1.8 4.1 2.8 7.3 2.8 6.7 0 11.2-3.8 12.3-9.5.6 0 1.2-.2 1.4-.5z" />
        </svg>
      );

    case 'Kubernetes':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#326CE5">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      );

    case 'CI/CD Pipelines':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M6 9v6M9 6h3a6 6 0 0 1 6 6M9 18h3a6 6 0 0 0 6-6" />
        </svg>
      );

    case 'Terraform':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#844FBA">
          <path d="M14.6 7.6v5.8l5.1-2.9V4.7l-5.1 2.9zm-5.3 3v5.8l5.1-2.9v-5.8L9.3 10.6zm0-8.9v5.8l5.1-2.9V0L9.3 1.7zm-5 3v5.8l5.1-2.9V1.8L4.3 4.7z" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
          <path d="M12 1L24 22H0L12 1Z" />
        </svg>
      );

    case 'OpenAI / LLMs':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#10A37F">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 13.633l2.879-1.664 2.879 1.664v3.329l-2.879 1.664-2.879-1.664z" />
        </svg>
      );

    case 'LangChain':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="2">
          <rect x="3" y="8" width="6" height="8" rx="3" />
          <rect x="15" y="8" width="6" height="8" rx="3" />
          <line x1="9" y1="12" x2="15" y2="12" strokeWidth="3" />
        </svg>
      );

    case 'PyTorch':
      return (
        <svg viewBox="0 0 24 24" width="20" height="22" fill="#EE4C2C">
          <path d="M12.6 0a10.8 10.8 0 0 0-8 18.1l2.4-2.4a7.4 7.4 0 0 1 5.6-12.3c4.1 0 7.4 3.3 7.4 7.4 0 3-1.8 5.7-4.6 6.8l2 2.6A10.8 10.8 0 0 0 12.6 0zm3.8 6.4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6z" />
        </svg>
      );

    case 'Vector Databases':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="1.75">
          <circle cx="5" cy="5" r="3" fill="#22C55E" />
          <circle cx="19" cy="5" r="3" fill="#22C55E" />
          <circle cx="12" cy="19" r="3" fill="#22C55E" />
          <line x1="7.5" y1="6.5" x2="16.5" y2="6.5" strokeDasharray="2 2" />
          <line x1="6.5" y1="7.5" x2="10.5" y2="16.5" strokeDasharray="2 2" />
          <line x1="17.5" y1="7.5" x2="13.5" y2="16.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'Custom Pipelines':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="2">
          <path d="M3 12h4l3-6 4 12 3-6h4" />
          <circle cx="3" cy="12" r="2" fill="#22C55E" />
          <circle cx="21" cy="12" r="2" fill="#22C55E" />
        </svg>
      );

    case 'Data Automation':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#22C55E" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" fill="#22C55E" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22C55E" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
}
