'use client';

interface SprintSidebarProps {
  activeId: string;
}

const SECTIONS = [
  { id: 'offer', label: 'Your Offer' },
  { id: 'campaign-theme', label: 'Campaign Theme' },
  { id: 'channel-strategy', label: 'Channel Strategy' },
  { id: 'content-calendar', label: 'Content Calendar' },
  { id: 'ready-to-use-copy', label: 'Ready-to-Use Copy' },
  { id: 'success-metric', label: '30-Day Success Metric' },
];

export function SprintSidebar({ activeId }: SprintSidebarProps) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-[rgba(201,169,110,0.28)] bg-surface">
      <nav className="space-y-1 px-4 py-6">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`block w-full rounded px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'border-l-2 border-gold bg-surface-2 text-gold'
                  : 'border-l-2 border-transparent text-text-2 hover:text-text-1'
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
