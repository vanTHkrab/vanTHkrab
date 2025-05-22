import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Import Link
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vanTHkrab",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '1rem', 
          backgroundColor: '#f0f0f0', 
          borderBottom: '1px solid #ddd' 
        }}>
          <Link href="/" style={{ marginRight: '2rem', color: '#333', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/chat" style={{ color: '#333', textDecoration: 'none' }}>
            Chat
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
