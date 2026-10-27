import type { Metadata } from "next";
import DownloadFormsClient from "@/components/resources/DownloadFormsClient";
import formsData from "@/data/forms-data.json";

export const metadata: Metadata = {
  title: "Download Home Loan Forms, Tax Certificates & NOCs | Money Viora",
  description: "Download verified legal drafts, Section 24b interest certificates, POA formats for NRIs, and builder NOC templates accepted by HDFC, SBI, and ICICI.",
};

export default function DownloadFormsPage() {
  return <DownloadFormsClient initialForms={formsData as any} />;
}
