import type { ReactNode } from 'react';

export default function PrintLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: '#050A0E', margin: 0, padding: 0 }}>
      <style>{`
        body {
          background: #050A0E !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        nav, aside, .sprint-sidebar, .sprint-nav {
          display: none !important;
        }
        main {
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
      {children}
    </div>
  );
}
