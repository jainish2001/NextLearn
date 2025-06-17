// Import type for metadata from Next.js
import type { Metadata } from "next";

// Import fonts from Google Fonts using Next.js font optimization
import { Geist, Geist_Mono } from "next/font/google";

// Import global CSS styles
import "./globals.css";

// Import shared UI components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

// Configure Geist Sans and Mono fonts with CSS variable support
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set up default metadata for the entire site
export const metadata: Metadata = {
  title: "NextLearn - Modern Learning Platform",
  description: "Discover top courses, learn from experts, and join a thriving community.",
};

// Root layout component that wraps all pages in the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ClientLayout can be used for client-only logic (e.g. context providers, themes, etc.) */}
        <ClientLayout>
          {/* Main site wrapper with full height and column layout */}
          <div className="min-h-screen flex flex-col">
            {/* Top navigation bar */}
            <Navbar />
            
            {/* Main content area with top padding to avoid overlapping Navbar */}
            <main className="flex-1 pt-20">{children}</main>
            
            {/* Footer displayed at the bottom of the page */}
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
