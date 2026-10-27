import InstantSanctionClient from "@/components/sanction/InstantSanctionClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant In-Principle Sanction Letter | Money Viora",
  description: "Get an instant official bank-grade In-Principle Home Loan Sanction Letter online in 2 minutes without impacting your credit score.",
};

export default function InstantSanctionPage() {
  return <InstantSanctionClient />;
}
