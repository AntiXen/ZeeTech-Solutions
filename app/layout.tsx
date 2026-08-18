import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { ThemeProvider } from '@/components/shared/ThemeProvider/ThemeProvider';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zeetech.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ZeeTech — Strategic Technology & Engineering Partner',
    template: '%s | ZeeTech',
  },
  description:
    'ZeeTech is a premium technology and software engineering partner. We architect, design, and build high-performance web platforms, SaaS products, fintech microservices, and mobile applications for ambitious ventures worldwide.',
  keywords: [
    'software engineering agency',
    'strategic technology partner',
    'custom software development',
    'SaaS platform development',
    'fintech infrastructure',
    'full-stack engineering',
    'product design UI UX',
    'Next.js development',
    'Flutter mobile development',
    'cloud architecture AWS',
    'Dhaka software agency',
    'ZeeTech',
  ],
  authors: [{ name: 'Amit Ghosh', url: siteUrl }],
  creator: 'ZeeTech Solutions',
  publisher: 'ZeeTech Solutions',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZeeTech — Strategic Technology & Engineering Partner',
    description:
      'We architect, design, and build high-performance web platforms, SaaS products, fintech microservices, and mobile applications that move businesses forward.',
    url: siteUrl,
    siteName: 'ZeeTech',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_case_study_presentation.png',
        width: 1200,
        height: 630,
        alt: 'ZeeTech — Strategic Technology Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeeTech — Strategic Technology & Engineering Partner',
    description:
      'From product design and software development to growth and long-term support, ZeeTech turns ambitious ideas into scalable technology.',
    images: ['https://pxkwlycravmqayuicqyj.supabase.co/storage/v1/object/public/ZeeTech/Portfolio/meridian_case_study_presentation.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'ZeeTech Solutions',
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      founder: {
        '@type': 'Person',
        name: 'Amit Ghosh',
        jobTitle: 'Founder and CEO',
      },
      sameAs: [
        'https://linkedin.com/company/zeetech',
        'https://github.com/zeetech',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@zeetech.com',
        availableLanguage: ['English', 'Bengali'],
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'ZeeTech Software & Product Engineering',
      url: siteUrl,
      description:
        'Strategic technology partner providing full-stack software development, UI/UX product design, enterprise cloud architecture, and growth optimization.',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'ZeeTech Core Capabilities',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Stack Software Development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX & Product Design Architecture',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fintech & Event-Driven Microservices',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cloud Native DevOps & SLA Support',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'ZeeTech',
      description: 'Strategic Technology Partner for Ambitious Ventures',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('zeetech-theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (systemDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable} suppressHydrationWarning>
      <head>
        <script
          id="zeetech-theme-init"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
