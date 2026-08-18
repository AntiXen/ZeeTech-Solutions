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

export const metadata: Metadata = {
  title: 'ZeeTech — Strategic Technology Partner',
  description:
    'From product design and software development to growth and long-term support, ZeeTech helps ambitious businesses turn ideas into technology that works.',
  keywords: [
    'software development',
    'technology partner',
    'product design',
    'web development',
    'mobile development',
    'Dhaka',
    'Bangladesh',
  ],
  openGraph: {
    title: 'ZeeTech — Strategic Technology Partner',
    description:
      'From product design and software development to growth and long-term support, ZeeTech helps ambitious businesses turn ideas into technology that works.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zeetech.com',
    siteName: 'ZeeTech',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeeTech — Strategic Technology Partner',
    description:
      'From product design and software development to growth and long-term support, ZeeTech helps ambitious businesses turn ideas into technology that works.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
