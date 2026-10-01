"use client";

// Custom SVGs instead of lucide-react to avoid any export issues

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[8000] hidden md:flex flex-col gap-1">
      <a 
        href="https://youtube.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/90 backdrop-blur border border-r-0 border-gray-200 text-gray-700 flex items-center justify-center rounded-l-xl shadow-lg hover:w-16 hover:bg-[#FF0000] hover:text-white transition-all duration-300 group"
        aria-label="YouTube"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0 -1.94 -2C18.88 4 12 4 12 4s-6.88 0 -8.6.46a2.78 2.78 0 0 0 -1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33a2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94 -2c.46 -1.71.46 -5.33.46 -5.33s0 -3.62 -.46 -5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      </a>
      
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/90 backdrop-blur border border-r-0 border-gray-200 text-gray-700 flex items-center justify-center rounded-l-xl shadow-lg hover:w-16 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 group"
        aria-label="Instagram"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="group-hover:scale-110 transition-transform"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>
      
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/90 backdrop-blur border border-r-0 border-gray-200 text-gray-700 flex items-center justify-center rounded-l-xl shadow-lg hover:w-16 hover:bg-black hover:text-white transition-all duration-300 group"
        aria-label="X (Twitter)"
      >
        {/* Custom X Logo since Lucide's Twitter is the old bird */}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      </a>
    </div>
  );
}
