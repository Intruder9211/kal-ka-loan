import type { Metadata } from "next";
import PreApprovedProjectsClient from "@/components/projects/PreApprovedProjectsClient";
import approvedProjects from "@/data/approved-projects.json";

export const metadata: Metadata = {
  title: "Pre-Approved Projects & Properties | Money Viora",
  description: "Search bank-approved housing projects and apartments across India with pre-verified titles for fastest loan sanctions from HDFC, SBI, ICICI & Axis.",
};

export default function PreApprovedProjectsPage() {
  return <PreApprovedProjectsClient initialProjects={approvedProjects} />;
}
