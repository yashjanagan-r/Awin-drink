import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AAVIN | Chilled Canned Cold Brew & Badam Milk',
  description:
    'Awwwards-level D2C chilled beverage e-commerce for Aavin. South India’s iconic farm-fresh dairy meets premium ready-to-drink cans: Badam Milk, Chocolate Coffee, and Madagascar Vanilla Coffee.',
  keywords: [
    'Aavin',
    'Badam Milk',
    'Cold Brew',
    'Chocolate Coffee',
    'Vanilla Coffee',
    'Tamil Nadu Dairy',
    'Chilled Cans',
    'D2C Beverage',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-black text-white antialiased selection:bg-amber-400 selection:text-black">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
