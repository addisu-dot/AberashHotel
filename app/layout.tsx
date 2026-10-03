import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FloatingSocialWidgets } from '@/components/FloatingSocialWidgets';

export const metadata: Metadata = {
  metadataBase: new URL('https://aberash-hotel.vercel.app'),
  title: 'Aberash Hotel | Durame, Ethiopia',
  description: 'Rooms, restaurant and garden in Durame, Ethiopia. Call 093 457 5243 or send a booking request online.',
  keywords: 'Aberash Hotel, Durame hotel, Durame accommodation, Ethiopia hotel, restaurant',
  openGraph: {
    title: 'Aberash Hotel | Durame, Ethiopia',
    description: 'Rooms, restaurant and garden in Durame, Ethiopia.',
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
