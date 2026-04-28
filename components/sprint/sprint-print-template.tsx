'use client';

import { printStyles } from './sprint-print-styles';
import type { DbSprint } from '@/lib/supabase/types';

interface SprintPrintTemplateProps {
  sprint: DbSprint;
}

export function SprintPrintTemplate({ sprint }: SprintPrintTemplateProps) {
  const output = (sprint.output as Record<string, any>) || {};
  const intake = (sprint.intake as Record<string, any>) || {};

  const channelItems = Array.isArray(output.channel_strategy)
    ? output.channel_strategy
    : typeof output.channel_strategy === 'string'
      ? output.channel_strategy.split('\n').filter((line: string) => line.trim())
      : [];

  const successItems = Array.isArray(output.success_metric)
    ? output.success_metric
    : typeof output.success_metric === 'string'
      ? output.success_metric.split('\n').filter((line: string) => line.trim())
      : [];

  const copyPrompts = Array.isArray(output.copy_prompts) ? output.copy_prompts : [];
  const contentCalendar = output.content_calendar || {};

  const WEEK_LABELS: Record<string, string> = {
    w1: 'Week 1',
    w2: 'Week 2',
    w3: 'Week 3',
    w4: 'Week 4',
  };

  const WEEK_DAYS: Record<string, string> = {
    w1: 'Days 1-7',
    w2: 'Days 8-14',
    w3: 'Days 15-21',
    w4: 'Days 22-30',
  };

  const promptsByWeek = copyPrompts.reduce((acc, item) => {
    const week = item.week || 'w1';
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const formatDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const capitalizeTitle = (title: string) => {
    return title
      .split(' - ')[0]
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const parseItemWithBullets = (item: string) => {
    const colonIndex = item.indexOf(':');
    if (colonIndex === -1) return { title: null, points: [item] };

    const title = item.substring(0, colonIndex).trim();
    const content = item.substring(colonIndex + 1).trim();

    const points = content
      .split(/\n|[\-•](?=\s)/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return { title, points };
  };

  return (
    <div className="sprint-print-template">
      <style>{printStyles}</style>

      <div className="print-header">
        <div>
          <h1>30-Day Sprint for {capitalizeTitle(intake.product || 'Your Product')}</h1>
          <p>Marketing Strategy & Execution Plan</p>
        </div>
      </div>

      <div className="print-section">
        <h2>1. Your Offer</h2>
        <div className="print-content-box">
          <p>{output.offer || 'N/A'}</p>
        </div>
      </div>

      <div className="print-section">
        <h2>2. Campaign Theme</h2>
        <div className="print-content-box">
          <p>{output.campaign_theme || 'N/A'}</p>
        </div>
      </div>

      <div className="print-section">
        <h2>3. Channel Strategy</h2>
        <p className="section-intro">Which platforms to prioritize and why</p>
        <div className="print-cards">
          {channelItems.map((item: string, idx: number) => {
            const { title, points } = parseItemWithBullets(item);
            return (
              <div key={idx} className="print-card">
                {title && <div style={{ fontWeight: 700, color: '#00C8FF', marginBottom: '8px', fontSize: '14px' }}>{title}</div>}
                <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                  {points.map((point: string, pIdx: number) => (
                    <li key={pIdx} style={{ marginBottom: '6px', color: '#EEF6FF', fontSize: '13px', position: 'relative', paddingLeft: '16px' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00C8FF', marginRight: '4px' }}>→ </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="print-section">
        <h2>4. Content Calendar</h2>
        <p className="section-intro">Daily content plan for 4 weeks</p>
        <table className="print-table print-table-header">
          <thead>
            <tr>
              <th className="print-table-th" style={{ width: '12%' }}>Day</th>
              <th className="print-table-th" style={{ width: '32%' }}>Topic</th>
              <th className="print-table-th" style={{ width: '32%' }}>Platforms</th>
              <th className="print-table-th" style={{ width: '24%' }}>Format</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(contentCalendar).map(([week, days]: [string, any]) => [
              <tr key={`${week}-header`} className="print-table-section-header">
                <td colSpan={4} className="print-table-section-title">
                  {WEEK_LABELS[week] || week.toUpperCase()} ({WEEK_DAYS[week] || ''})
                </td>
              </tr>,
              ...((Array.isArray(days) ? days : []).map((day: any, idx: number) => (
                <tr key={`${week}-${idx}`} className="print-table-row">
                  <td className="print-table-cell">{day.day}</td>
                  <td className="print-table-cell">{day.topic}</td>
                  <td className="print-table-cell">{Array.isArray(day.platforms) ? day.platforms.join(', ') : day.platforms}</td>
                  <td className="print-table-cell">{day.format}</td>
                </tr>
              )))
            ]).flat()}
          </tbody>
        </table>
      </div>

      <div className="print-section">
        <h2>5. Copy Generation Prompts</h2>
        <p className="section-intro">Strategic frameworks to generate fresh content daily</p>

        <table className="print-table print-table-header">
          <thead>
            <tr>
              <th className="print-table-th" style={{ width: '8%' }}>Day</th>
              <th className="print-table-th" style={{ width: '12%' }}>Platform</th>
              <th className="print-table-th" style={{ width: '10%' }}>Format</th>
              <th className="print-table-th" style={{ width: '70%' }}>Angle / Hook / Message / CTA</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(promptsByWeek).map(([weekKey, prompts]: [string, any]) => [
              <tr key={`${weekKey}-header`} className="print-table-section-header">
                <td colSpan={4} className="print-table-section-title">
                  {WEEK_LABELS[weekKey] || weekKey} ({WEEK_DAYS[weekKey] || ''})
                </td>
              </tr>,
              ...((Array.isArray(prompts) ? prompts : []).map((item: any, idx: number) => (
                <tr key={`${weekKey}-${idx}`} className="print-table-row">
                  <td className="print-table-cell">{item.day}</td>
                  <td className="print-table-cell">{item.platform}</td>
                  <td className="print-table-cell">{item.format}</td>
                  <td className="print-table-cell">
                    <div style={{ marginBottom: '6px' }}><strong style={{ color: '#00C8FF' }}>Angle:</strong> {item.angle}</div>
                    <div style={{ marginBottom: '6px' }}><strong style={{ color: '#00C8FF' }}>Hook:</strong> {item.hook}</div>
                    <div style={{ marginBottom: '6px' }}><strong style={{ color: '#00C8FF' }}>Message:</strong> {item.key_message}</div>
                    <div><strong style={{ color: '#00C8FF' }}>CTA:</strong> {item.cta}</div>
                  </td>
                </tr>
              )))
            ]).flat()}
          </tbody>
        </table>
      </div>

      <div className="print-section">
        <h2>6. Success Metrics</h2>
        <p className="section-intro">Specific, measurable goals for the 30-day period</p>
        <div className="print-cards">
          {successItems.map((item: string, idx: number) => {
            const { title, points } = parseItemWithBullets(item);
            return (
              <div key={idx} className="print-card">
                {title && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ color: '#00C8FF', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <div style={{ fontWeight: 700, color: '#00C8FF', fontSize: '14px' }}>{title}</div>
                  </div>
                )}
                <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                  {points.map((point: string, pIdx: number) => (
                    <li key={pIdx} style={{ marginBottom: '6px', color: '#EEF6FF', fontSize: '13px', position: 'relative', paddingLeft: '16px' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00C8FF', marginRight: '4px' }}>→ </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="print-actions">
        <button
          className="print-action-btn"
          onClick={() => window.print()}
          title="Save as PDF"
        >
          Save
        </button>
        <button
          className="print-action-btn primary"
          onClick={() => window.close()}
          title="Close this window"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
