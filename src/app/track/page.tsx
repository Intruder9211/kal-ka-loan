import { Suspense } from "react";
import TrackStatusClient from "@/components/tracking/TrackStatusClient";

export const metadata = {
  title: "Track Your Application | Money Viora",
  description: "Track the real-time progress of your home loan application, doorstep visit, or enquiry.",
};

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <Suspense fallback={<div className="max-w-2xl mx-auto p-12 text-center text-slate-500">Loading tracker...</div>}>
        <TrackStatusClient />
      </Suspense>
    </div>
  );
}
