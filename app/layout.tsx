import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SupportBtn from '@/components/SupportBtn';

export const metadata: Metadata = {
  title: 'G24L - Shaping Tomorrow\'s Technology Today',
  description: 'Innovative IT solutions making cutting-edge technology accessible to everyone. Mars base projects, automated wealth management, and enterprise technology.',
  keywords: 'IT consulting, technology solutions, innovation, digital transformation',
  openGraph: {
    title: 'G24L - Innovative IT Solutions',
    description: 'Leading IT enterprise bringing tomorrow\'s technology to today.',
    url: 'https://g24l.de',
    siteName: 'G24L',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <SupportBtn />
      </body>
    </html>
  );
}
