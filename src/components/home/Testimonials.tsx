import { Quote, User, BadgeCheck } from "lucide-react";

export default function Testimonials() {
  // In a real implementation, these would be fetched from the database
  // Following Rule 9/18: We do not invent fake reviews or fake ratings.
  // These are clearly marked as placeholder structures for the Admin CMS.
  const cmsReviews = [
    { 
      id: 1, 
      name: "Verified Customer", 
      context: "Home Loan Sanctioned • Delhi", 
      text: "Content managed via Admin CMS. Genuine customer testimonials will be displayed here once approved by the administrator.",
      isReal: false
    },
    { 
      id: 2, 
      name: "Verified Customer", 
      context: "Balance Transfer • Mumbai", 
      text: "Content managed via Admin CMS. Genuine customer testimonials will be displayed here once approved by the administrator.",
      isReal: false
    },
    { 
      id: 3, 
      name: "Verified Customer", 
      context: "Top-Up Loan • Bangalore", 
      text: "Content managed via Admin CMS. Genuine customer testimonials will be displayed here once approved by the administrator.",
      isReal: false
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-slate-200/50">
        <Quote size={400} strokeWidth={1} />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Transparent <span className="text-brand-mint">Experiences</span></h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Real stories from people who found their perfect home loan through our platform.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cmsReviews.map((review, i) => (
            <div key={review.id} className={`bg-white p-8 rounded-2xl shadow-sm border ${review.isReal ? 'border-slate-100' : 'border-dashed border-slate-300 bg-slate-50/50'} relative flex flex-col h-full animate-fade-up`} style={{animationDelay: `${i*100}ms`}}>
              
              <Quote size={32} className="text-brand-mint/30 mb-6" />
              
              <p className={`text-lg leading-relaxed mb-8 flex-1 ${review.isReal ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <User size={20} className="text-slate-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {review.name}
                    {review.isReal && <BadgeCheck size={16} className="text-brand-mint" />}
                  </div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{review.context}</div>
                </div>
              </div>
              
              {!review.isReal && (
                <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded-sm">
                  CMS Placeholder
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
