'use client';
import './globals.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: '2rem', clear: 'both' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
