import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Money Viora",
  description: "Get in touch with Money Viora experts for your home loan queries.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {/* Floating Hero Section matching Home, Affordability & Calculators */}
      <section className="p-3 sm:p-4 md:p-6">
        <div className="bg-brand-deep text-white py-12 md:py-16 relative overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-mint via-brand-deep to-brand-deep"></div>
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Get in <span className="text-brand-mint">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              Have questions about your home loan? Our experts are here to help you navigate the process.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-brand-deep">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-mint shadow-sm shrink-0 border border-gray-100">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+91 73030 61282</p>
                  <p className="text-xs text-gray-400 mt-1">Mon-Sat, 9am to 7pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-mint shadow-sm shrink-0 border border-gray-100">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <p className="text-gray-600">support@moneyviora.com</p>
                  <p className="text-xs text-gray-400 mt-1">We typically reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-mint shadow-sm shrink-0 border border-gray-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Office</h4>
                  <p className="text-gray-600">123, Financial District,<br/>Connaught Place, New Delhi - 110001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <ContactForm />

        </div>
      </div>
    </div>
  );
}
