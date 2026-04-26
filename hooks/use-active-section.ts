import { useEffect, useState } from 'react';

const SECTION_IDS = ['offer', 'campaign-theme', 'channel-strategy', 'content-calendar', 'ready-to-use-copy', 'success-metric'];

export function useActiveSection() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => ({
      id,
      element: document.getElementById(id),
    })).filter((item) => item.element);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: [0], rootMargin: '-50% 0px -50% 0px' }
    );

    elements.forEach((item) => {
      if (item.element) observer.observe(item.element);
    });

    return () => observer.disconnect();
  }, []);

  return activeId;
}
