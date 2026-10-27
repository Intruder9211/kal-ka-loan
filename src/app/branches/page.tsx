import BranchLocatorClient from "@/components/branches/BranchLocatorClient";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branch & Service Center Locator | Money Viora",
  description: "Find your nearest Money Viora branch, doorstep loan servicing hub, or loan consultation center.",
};

function getInitialBranches() {
  try {
    const filePath = path.join(process.cwd(), "src/data/branches-data.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return data.branches || [];
    }
  } catch (err) {
    console.error("Failed to load branches-data.json:", err);
  }
  return [];
}

export default function BranchesPage() {
  const initialBranches = getInitialBranches();

  return <BranchLocatorClient initialBranches={initialBranches} />;
}
