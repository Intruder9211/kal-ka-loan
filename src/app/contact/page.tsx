import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Money Viora",
  description: "Get in touch with Money Viora experts for your home loan queries.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="bg-brand-deep text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get in <span className="text-brand-mint">Touch</span>
          </h1>
          <p className="text-lg text-gray-300">
            Have questions about your home loan? Our experts are here to help you navigate the process.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
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

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-brand-deep mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none bg-white text-gray-900 placeholder-gray-400" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none bg-white text-gray-900 placeholder-gray-400" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none resize-none bg-white text-gray-900 placeholder-gray-400" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="btn-interactive w-full bg-brand-deep text-white font-bold py-4 rounded-lg mt-2 hover:bg-opacity-90">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
