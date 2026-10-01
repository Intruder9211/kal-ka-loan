import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kal Ka Loan",
  description: "Terms and conditions for using Kal Ka Loan services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-brand max-w-none">
          <h1 className="text-4xl font-extrabold text-brand-deep mb-8">Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using the Kal Ka Loan website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">2. Description of Service</h2>
          <p className="text-gray-600 mb-4">
            Kal Ka Loan is a loan distribution and aggregator platform. We do not lend money directly. We connect prospective borrowers with banks and NBFCs. Final loan approval, interest rates, and terms are strictly at the discretion of the lending partner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">3. User Obligations</h2>
          <p className="text-gray-600 mb-4">
            You agree to provide true, accurate, current, and complete information about yourself as prompted by the site's forms. You are solely responsible for any consequences arising from providing false information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">
            Kal Ka Loan shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, or resulting from any loans obtained through our lending partners.
          </p>
        </section>

        </div>
      </div>
    </div>
  );
}
