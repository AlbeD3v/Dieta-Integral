'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch('/api/views', { method: 'POST' });
        const data = await res.json();
        setViews(data.count);
      } catch (error) {
        console.error('Failed to fetch views:', error);
      }
    };

    fetchViews();
  }, []);

  return (
    <p>
      {views.toLocaleString()} visitas
    </p>
  );
}
