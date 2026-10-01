import Link from "next/link";
import lendersData from "@/data/lenders.json";

export default function RateComparison() {
  const tableData = lendersData.slice(0, 5);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Current Interest Rates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Compare top banks at a glance. Rates updated daily.</p>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm animate-fade-up stagger-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-light text-brand-deep">
                <th className="p-4 font-bold border-b border-gray-100">Bank / NBFC</th>
                <th className="p-4 font-bold border-b border-gray-100">Interest Rate (p.a.)</th>
                <th className="p-4 font-bold border-b border-gray-100">Processing Fee</th>
                <th className="p-4 font-bold border-b border-gray-100">Max Tenure</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((bank, i) => (
                <tr key={bank.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-brand-deep">{bank.name}</td>
                  <td className="p-4 text-green-600 font-bold">{bank.interestRate}</td>
                  <td className="p-4 text-gray-600">{bank.processingFee}</td>
                  <td className="p-4 text-gray-600">{bank.maxTenure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <Link href="/compare" className="btn-interactive inline-block bg-brand-deep text-white font-bold px-8 py-4 rounded-full">
            Compare All Banks
          </Link>
        </div>
      </div>
    </section>
  );
}
