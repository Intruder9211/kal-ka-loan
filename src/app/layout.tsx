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
                    'navy-blue': { deep: '#0f233a', mint: '#38bdf8', light: '#f1f6fa', dark: '#091728', via: '#0b1d30', to: '#050e1a' },
                    'midnight-slate': { deep: '#192231', mint: '#60a5fa', light: '#f4f6f9', dark: '#0f1622', via: '#141c28', to: '#090e16' },
                    'emerald-teal': { deep: '#13353b', mint: '#34d399', light: '#f2f8f7', dark: '#0c2327', via: '#0f2c31', to: '#071619' },
                    'royal-sapphire': { deep: '#1b2447', mint: '#818cf8', light: '#f3f5fc', dark: '#10162e', via: '#151d3b', to: '#0a0e1e' },
                    'nordic-steel': { deep: '#1a2a36', mint: '#4fc3f7', light: '#f2f6f9', dark: '#0e1a24', via: '#14222c', to: '#081017' },
                    'rich-charcoal': { deep: '#1a1d24', mint: '#10b981', light: '#f5f6f8', dark: '#101217', via: '#15181e', to: '#0a0c0f' },
                    'monaco-blue': { deep: '#132544', mint: '#2dd4bf', light: '#f1f5fa', dark: '#0b1629', via: '#0e1d35', to: '#060d19' }
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
