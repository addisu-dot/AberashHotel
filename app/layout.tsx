import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingSocialWidgets } from '@/components/FloatingSocialWidgets';

export const metadata: Metadata = {
  title: 'Aberash Hotel - Luxury Hospitality',
  description: 'Experience luxury meets serenity at Aberash Hotel. Premium accommodations, fine dining, and exceptional service.',
  keywords: 'hotel, luxury, hospitality, accommodation, dining',
  openGraph: {
    title: 'Aberash Hotel',
    description: 'Luxury Hospitality Experience',
    images: ['/image/name.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <Navigation />
        {children}
        <FloatingSocialWidgets />
        <Footer />
      </body>
    </html>
  );
}
