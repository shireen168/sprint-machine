import { useEffect, useState } from 'react';

const SECTION_IDS = ['offer', 'campaign-theme', 'channel-strategy', 'content-calendar', 'ready-to-use-copy', 'success-metric'];

export function useActiveSection() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold: 0.4, rootMargin: '-60px 0px -66%' }
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeId;
}
