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
import VisitorTracker from "@/components/analytics/VisitorTracker";
import WelcomePopup from "@/components/ui/WelcomePopup";
import InstantCallbackBar from "@/components/ui/InstantCallbackBar";
import { auth } from "@/auth";
import { PublicWrapper } from "@/components/layout/PublicWrapper";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Money Viora | Fast, transparent, hassle-free home loans",
  description: "Compare offers from multiple banks, check eligibility, and get your home loan sanctioned fast. Aaj apply karo, kal paisa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html
      lang="en"
      data-theme="forest-green"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var themeMap = {
                    'forest-green': { deep: '#1a3b32', mint: '#75e87a', light: '#f4f7f6', dark: '#0f231e', via: '#0d2a23', to: '#061e18' },
                    'navy-blue': { deep: '#0a192f', mint: '#38bdf8', light: '#f0f7ff', dark: '#050d1a', via: '#0e2444', to: '#040912' },
                    'sunset-orange': { deep: '#2e150a', mint: '#fb923c', light: '#fff7ed', dark: '#1c0c05', via: '#3d1c0e', to: '#120703' },
                    'royal-purple': { deep: '#24123b', mint: '#c084fc', light: '#faf5ff', dark: '#150923', via: '#341a54', to: '#0e0517' },
                    'slate-black': { deep: '#0f1115', mint: '#facc15', light: '#f8fafc', dark: '#050607', via: '#1a1e24', to: '#07080a' },
                    'ruby-red': { deep: '#3b111a', mint: '#fb7185', light: '#fff1f2', dark: '#22090f', via: '#4f1723', to: '#150407' },
                    'ocean-teal': { deep: '#0c2b33', mint: '#2dd4bf', light: '#f0fdfa', dark: '#06191e', via: '#113c47', to: '#030d10' }
                  };
                  var saved = localStorage.getItem('moneyviora_theme') || 'forest-green';
                  var t = themeMap[saved] || themeMap['forest-green'];
                  var root = document.documentElement;
                  root.setAttribute('data-theme', saved);
                  root.style.setProperty('--brand-deep', t.deep);
                  root.style.setProperty('--brand-mint', t.mint);
                  root.style.setProperty('--brand-light', t.light);
                  root.style.setProperty('--brand-dark', t.dark);
                  root.style.setProperty('--brand-gradient-via', t.via);
                  root.style.setProperty('--brand-gradient-to', t.to);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-light text-brand-deep transition-colors duration-300">
        <ThemeProvider>
          <VisitorTracker />
          <SiteLoader />
          <PageTransition />
          
          {/* We use a PublicWrapper to hide public components (Header, Footer) on Dashboard and Admin routes */}
          <PublicWrapper>
            <Header session={session} />
          </PublicWrapper>
          
          <main className="flex-1 flex flex-col pb-16 md:pb-0">
            {children}
          </main>
          
          <PublicWrapper>
            <Footer />
            <StickyMobileCTA />
            <LeadModal />
            <WelcomePopup />
            <InstantCallbackBar />
            <Chatbot />
            <SocialSidebar />
          </PublicWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
