"use client"

import { useState } from "react"
import { Globe, Save, Layout, MessageSquare, Image as ImageIcon, AlertCircle } from "lucide-react"

export default function WebsiteAdminPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Website content saved successfully!")
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-600" />
            Website Content Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage public-facing website copy, images, and contact information.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "general" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Globe className="h-4 w-4" /> General Settings
            </button>
            <button 
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "hero" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Layout className="h-4 w-4" /> Hero Section
            </button>
            <button 
              onClick={() => setActiveTab("contact")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "contact" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <MessageSquare className="h-4 w-4" /> Contact Info
            </button>
            <button 
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "seo" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <AlertCircle className="h-4 w-4" /> SEO & Meta
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" defaultValue="Kal Ka Loan" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                  <input type="text" defaultValue="Fast, transparent, hassle-free loans" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website Logo</label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="h-16 w-48 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img src="/logo.png" alt="Current Logo" className="object-contain h-10" />
                    </div>
                    <button className="px-3 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      Change Logo
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 border-t border-slate-100">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-blue-500 transition-all top-0 bottom-0 m-auto" />
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
                  </div>
                  <label className="text-sm font-medium text-slate-700">Maintenance Mode (Hide site from public)</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">Hero Section</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hero Heading</label>
                  <input type="text" defaultValue="Your Dream Home, Just a Loan Away." className="w-full text-sm font-semibold border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
                  <textarea rows={3} defaultValue="We provide the best interest rates with zero hidden charges. Apply today in under 5 minutes." className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Call to Action</label>
                  <div className="flex gap-4">
                    <input type="text" defaultValue="Apply Now" className="w-1/3 text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" placeholder="Button Text" />
                    <input type="text" defaultValue="/loans" className="w-2/3 text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" placeholder="Button Link URL" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hero Background Image</label>
                  <div className="mt-1 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50/50">
                    <ImageIcon className="h-8 w-8 mb-2 text-slate-400" />
                    <span className="text-sm font-medium">Click to upload new background</span>
                    <span className="text-xs mt-1">Recommended size: 1920x1080px (WebP or JPG)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                  <input type="email" defaultValue="support@kalkaloan.com" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sales Email</label>
                  <input type="email" defaultValue="sales@kalkaloan.com" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Toll Free)</label>
                  <input type="text" defaultValue="1800-123-4567" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Support</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Corporate Address</label>
                  <textarea rows={3} defaultValue="123 Financial District, Cyber City, Phase 2, Gurugram, Haryana - 122002" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">SEO & Metadata</h3>
              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-4">
                These settings control how your website appears on Google and when shared on social media.
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Global Meta Title</label>
                  <input type="text" defaultValue="Kal Ka Loan | Fast, transparent, hassle-free home loans" className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Global Meta Description</label>
                  <textarea rows={3} defaultValue="Get instant home loans with Kal Ka Loan. Check eligibility in 2 minutes and get disbursed in 48 hours with minimal documentation." className="w-full text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}
