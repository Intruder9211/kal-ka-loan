"use client"

import { useState } from "react"
import { Settings, Save, Bell, Shield, Key, Mail, Smartphone, Globe, Database } from "lucide-react"

export default function SettingsAdminPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("System settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-slate-700" /> System Settings
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure global application behavior, security, and integrations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === "general" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Globe className="h-4 w-4" /> General Preferences
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === "security" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Shield className="h-4 w-4" /> Security & Auth
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === "notifications" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Bell className="h-4 w-4" /> Notification Rules
            </button>
            <button 
              onClick={() => setActiveTab("api")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === "api" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Key className="h-4 w-4" /> API & Integrations
            </button>
            <button 
              onClick={() => setActiveTab("data")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === "data" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Database className="h-4 w-4" /> Data Management
            </button>
          </nav>
        </div>

        {/* Settings Form */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
          
          {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">General Preferences</h3>
                <p className="text-sm text-slate-500 mb-6">Basic configuration for the loan management system.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">System Timezone</label>
                    <select className="w-full max-w-md text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white">
                      <option>Asia/Kolkata (IST)</option>
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Default Currency</label>
                    <select className="w-full max-w-md text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white">
                      <option>INR (₹) - Indian Rupee</option>
                      <option>USD ($) - US Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Application Processing</h4>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900" />
                    <div>
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">Auto-assign new applications</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Automatically route new loan applications to available loan officers in a round-robin fashion.</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900" />
                    <div>
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">Require manual KYC verification</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Block final loan approval until an admin has manually verified uploaded PAN and Aadhaar documents.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Security & Authentication</h3>
                <p className="text-sm text-slate-500 mb-6">Manage password policies, MFA, and session timeouts.</p>
                
                <div className="space-y-6">
                  <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                        <p className="text-xs text-slate-600 mt-1">Require all internal admins to use an authenticator app.</p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" defaultChecked name="toggle_2fa" id="toggle_2fa" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-blue-600 transition-all top-0 bottom-0 m-auto" />
                        <label htmlFor="toggle_2fa" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Session Timeout (Minutes)</label>
                    <input type="number" defaultValue="30" className="w-full max-w-xs text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white" />
                    <p className="text-xs text-slate-500 mt-1.5">Automatically log out idle admin users to protect sensitive financial data.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Minimum Password Length</label>
                    <input type="number" defaultValue="12" className="w-full max-w-xs text-sm border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Notification Rules</h3>
                <p className="text-sm text-slate-500 mb-6">Configure automated emails and SMS sent to customers.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" /> Email Triggers
                    </h4>
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-700">Application Submitted Confirmation</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-700">Document Verification Required</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-700">Loan Approval/Rejection Status</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-slate-400" /> SMS Triggers (Requires Twilio/Msg91)
                    </h4>
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-700">OTP for Login/Signup</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm text-slate-700">EMI Payment Reminders</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">API & External Integrations</h3>
                <p className="text-sm text-slate-500 mb-6">Manage third-party service connections and webhook endpoints.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                      Experian / CIBIL API Key
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Connected</span>
                    </label>
                    <input type="password" defaultValue="sk_dummy_1234567890abcdefghijklmnopqrstuvwxyz" className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                      AWS S3 Bucket (Document Storage)
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Pending Setup</span>
                    </label>
                    <input type="text" placeholder="e.g., moneyviora-prod-documents" className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stripe / Razorpay Secret Key</label>
                    <input type="password" placeholder="rzp_live_..." className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-slate-500 focus:border-slate-500 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
