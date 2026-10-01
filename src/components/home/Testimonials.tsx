import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Rahul Sharma", city: "Delhi NCR", amount: "₹45 Lakhs", text: "Kal Ka Loan made my home buying process so smooth. The relationship manager handled all bank interactions and I got a sanction in 3 days!" },
    { name: "Priya Desai", city: "Mumbai", amount: "₹1.2 Cr", text: "I transferred my existing loan through them and saved almost ₹8,000 on my monthly EMI. Excellent service and zero hidden charges." },
    { name: "Amit Kumar", city: "Bangalore", amount: "₹75 Lakhs", text: "Very transparent process. They showed me exactly which bank was offering the best rate for my CIBIL score. Highly recommended." },
  ];

  return (
    <section className="py-20 bg-brand-light relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-brand-mint/10">
        <Quote size={400} />
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deep mb-4">Loved by our Customers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. See what homebuyers across India have to say.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm border border-brand-mint/20 animate-fade-up stagger-${i+1}`}>
              <div className="flex text-[#FFD700] mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="font-bold text-brand-deep">{review.name}</div>
                <div className="text-sm text-gray-500">{review.city} • Loan: {review.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
