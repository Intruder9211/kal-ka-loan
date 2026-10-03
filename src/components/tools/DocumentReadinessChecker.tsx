"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, FileText, Upload } from "lucide-react";

export default function DocumentReadinessChecker() {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setResults(null);
    }
  };

  const analyzeDocuments = () => {
    if (files.length === 0) return;
    setAnalyzing(true);
    
    // Simulate AI document scanning and validation
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        score: 85,
        checks: [
          { name: "Salary Slips (Last 3 Months)", status: "passed", message: "All 3 months present. Income consistent." },
          { name: "Bank Statements", status: "passed", message: "6 months continuous statements found." },
          { name: "ITR / Form 16", status: "warning", message: "Latest ITR missing. Found previous year only." },
          { name: "KYC Documents", status: "passed", message: "PAN and Aadhar matched." },
        ]
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-deep mb-2">Document Readiness Checker</h3>
        <p className="text-gray-600">Upload your loan documents to check for consistency before applying to avoid underwriting delays.</p>
      </div>

      {!results && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-brand-mint transition-colors bg-gray-50">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-700 font-medium mb-2">Drag and drop your documents here</p>
          <p className="text-gray-500 text-sm mb-6">Support for PDF, JPG, PNG (Max 10MB each)</p>
          
          <label className="cursor-pointer bg-brand-deep text-white px-6 py-3 rounded-full font-medium hover:bg-brand-mint hover:text-brand-deep transition-colors inline-block">
            Browse Files
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {files.length > 0 && !results && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">Selected Files ({files.length})</h4>
          <ul className="space-y-2 mb-6">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <FileText size={16} className="text-brand-mint" /> {file.name}
              </li>
            ))}
          </ul>
          <button 
            onClick={analyzeDocuments}
            disabled={analyzing}
            className="w-full bg-brand-mint text-brand-deep font-bold py-4 rounded-xl disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {analyzing ? (
              <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-deep"></span> Analyzing Documents...</>
            ) : "Run Readiness Scan"}
          </button>
        </div>
      )}

      {results && (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="bg-brand-light rounded-xl p-6 text-center mb-6">
            <div className="text-5xl font-black text-brand-deep mb-2">{results.score}%</div>
            <p className="text-brand-deep font-medium">Readiness Score</p>
            <p className="text-sm text-gray-600 mt-2">Your documents are mostly complete. Fix the warnings below to ensure a smooth approval.</p>
          </div>

          <div className="space-y-4">
            {results.checks.map((check: any, idx: number) => (
              <div key={idx} className={`p-4 rounded-lg border flex gap-4 ${check.status === 'passed' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <div className="mt-1">
                  {check.status === 'passed' ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <AlertCircle className="text-yellow-500" size={24} />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-gray-800">{check.name}</h5>
                  <p className="text-sm text-gray-600">{check.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center flex gap-4 justify-center">
            <button onClick={() => { setFiles([]); setResults(null); }} className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 font-medium">
              Start Over
            </button>
            <button className="px-6 py-2 bg-brand-deep text-white rounded-full font-medium hover:bg-brand-mint hover:text-brand-deep transition-colors">
              Proceed to Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
