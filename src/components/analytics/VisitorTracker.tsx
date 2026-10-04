'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // Fire and forget, we don't need to block or wait for it
    fetch('/api/track', { method: 'POST' }).catch(console.error);
  }, []);

  return null; // This component doesn't render anything
}
