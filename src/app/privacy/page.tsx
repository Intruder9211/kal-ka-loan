import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Money Viora",
  description: "Privacy policy and data protection guidelines for Money Viora users.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-brand max-w-none">
          <h1 className="text-4xl font-extrabold text-brand-deep mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            At Money Viora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our loan distribution services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Name and contact data (email address, phone number)</li>
            <li>Financial information (income, employment type, loan requirements)</li>
            <li>Demographic data (city, age)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect primarily to provide, maintain, protect and improve our current services and to develop new ones.
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>To match you with the best lending partners</li>
            <li>To communicate with you regarding your loan application</li>
            <li>To improve customer service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">4. Sharing Your Information</h2>
          <p className="text-gray-600 mb-4">
            We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers. We share your specific loan requirement data ONLY with our trusted lending partners (Banks & NBFCs) to process your application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">5. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <a href="mailto:privacy@moneyviora.com" className="text-brand-mint font-bold hover:underline">privacy@moneyviora.com</a>
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
