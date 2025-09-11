import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Age Calculator - Determine School Entry Year',
  description: 'Calculate when your child can start school based on your location and their birth date. Supports multiple countries including USA, Canada, Australia, India, Pakistan, China, and UAE.',
  keywords: 'school age calculator, school entry, kindergarten, preschool, education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}