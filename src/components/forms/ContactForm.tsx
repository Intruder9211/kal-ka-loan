"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please enter both your name and email address.");
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile || "N/A",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-brand-deep mb-2">Send us a Message</h3>
      <p className="text-sm text-gray-500 mb-6">Fill out the form below and our home loan advisors will reach out promptly.</p>

      {status === "success" ? (
        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3 animate-fade-in">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={28} />
          </div>
          <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
          <p className="text-sm text-emerald-700">
            Thank you for contacting Money Viora. One of our home loan specialists will get in touch with you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-700 text-sm flex items-start gap-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none bg-white text-gray-900 placeholder-gray-400 transition-all text-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none bg-white text-gray-900 placeholder-gray-400 transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none bg-white text-gray-900 placeholder-gray-400 transition-all text-sm"
                placeholder="e.g. 9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-mint outline-none resize-none bg-white text-gray-900 placeholder-gray-400 transition-all text-sm"
              placeholder="Tell us about your loan requirement or query..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-interactive w-full bg-brand-deep text-white font-bold py-3.5 rounded-lg mt-2 hover:bg-opacity-90 flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
