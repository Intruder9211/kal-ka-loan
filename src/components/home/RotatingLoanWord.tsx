"use client";

import { useState, useEffect } from "react";

const ROTATING_WORDS = [
  "Home Loan",
  "Bank Transfer",
  "Top-up Loan",
  "Plot & Construction",
  "Loan Against Property",
];

export default function RotatingLoanWord() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFading(false);
      }, 350); // fade out duration
    }, 2800); // 2.8 seconds per word

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative">
      <span
        className={`inline-block text-brand-mint drop-shadow-[0_0_20px_rgba(117,232,122,0.4)] transition-all duration-350 ease-out transform ${
          isFading
            ? "opacity-0 -translate-y-2 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {ROTATING_WORDS[index]}.
      </span>
    </span>
  );
}
