import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadModal from "@/components/ui/LeadModal";
import PageTransition from "@/components/layout/PageTransition";
import SiteLoader from "@/components/layout/SiteLoader";
import Chatbot from "@/components/ui/Chatbot";
import SocialSidebar from "@/components/layout/SocialSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kal Ka Loan | Fast, transparent, hassle-free home loans",
  description: "Compare offers from multiple banks, check eligibility, and get your home loan sanctioned fast. Aaj apply karo, kal paisa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-light text-brand-deep">
        <SiteLoader />
        <PageTransition />
        <Header />
        <main className="flex-1 flex flex-col pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <LeadModal />
        <Chatbot />
        <SocialSidebar />
      </body>
    </html>
  );
}
