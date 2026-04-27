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

  const capitalizeProduct = (product: string) => {
    return product
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="sprint-print-template">
      <style>{printStyles}</style>

      <div className="print-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>30-Day Sprint for {capitalizeProduct(intake.product || 'Your Product')}</h1>
            <p>Marketing Strategy & Execution Plan</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#999' }}>
            <p style={{ margin: '0 0 4px 0' }}>Generated on</p>
            <p style={{ margin: 0, fontWeight: 500 }}>{formatDate()}</p>
          </div>
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
        <ul className="print-list">
          {channelItems.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="print-section">
        <h2>4. Content Calendar</h2>
        <p className="section-intro">Daily content plan for 4 weeks</p>
        <div className="print-calendar">
          {Object.entries(contentCalendar).map(([week, days]: [string, any]) => (
            <div key={week} className="print-week">
              <h4>
                {WEEK_LABELS[week] || week.toUpperCase()} ({WEEK_DAYS[week] || ''})
              </h4>
              {Array.isArray(days) &&
                days.map((day: any, idx: number) => (
                  <div key={idx} className="print-day">
                    <div className="print-day-header">{day.day}</div>
                    <div className="print-day-item">
                      <strong>Topic:</strong> {day.topic}
                    </div>
                    <div className="print-day-item">
                      <strong>Platforms:</strong> {Array.isArray(day.platforms) ? day.platforms.join(', ') : day.platforms}
                    </div>
                    <div className="print-day-item">
                      <strong>Format:</strong> {day.format}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="print-section">
        <h2>5. Copy Generation Prompts</h2>
        <p className="section-intro">Strategic frameworks to generate fresh content daily</p>

        {Object.entries(promptsByWeek).map(([weekKey, prompts]: [string, any]) => (
          <div key={weekKey}>
            <h3>
              {WEEK_LABELS[weekKey] || weekKey} ({WEEK_DAYS[weekKey] || ''})
            </h3>
            <div className="print-week">
              {prompts.map((item: any, idx: number) => (
                <div key={idx} className="print-prompt-item">
                  <div className="print-prompt-header">
                    {item.day} - {item.platform} ({item.format})
                  </div>

                  <div className="print-prompt-details">
                    <div className="print-prompt-detail-item">
                      <strong>Angle:</strong> {item.angle}
                    </div>
                    <div className="print-prompt-detail-item">
                      <strong>Hook:</strong> {item.hook}
                    </div>
                    <div className="print-prompt-detail-item">
                      <strong>Key Message:</strong> {item.key_message}
                    </div>
                    <div className="print-prompt-detail-item">
                      <strong>CTA:</strong> {item.cta}
                    </div>
                  </div>

                  <div className="print-prompt-text">{item.prompt}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="print-section">
        <h2>6. Success Metrics</h2>
        <p className="section-intro">Specific, measurable goals for the 30-day period</p>
        <ul className="print-list">
          {successItems.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #E8D5B0' }}>
        <p className="print-metadata">Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
