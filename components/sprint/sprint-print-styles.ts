export const printStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

  @page {
    margin: 1.5cm;
    size: A4;
  }

  .sprint-print-template {
    font-family: 'IBM Plex Sans', sans-serif;
    line-height: 1.6;
    color: #EEF6FF;
    background: #050A0E;
    padding: 40px 60px;
    min-height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
  }

  .print-header {
    padding-bottom: 20px;
    margin-bottom: 36px;
    page-break-after: avoid;
  }

  .print-header h1 {
    font-size: 30px;
    font-weight: bold;
    color: #00C8FF;
    margin: 0 0 8px 0;
    font-family: 'Exo 2', sans-serif;
    line-height: 1.3;
  }

  .print-header p {
    font-size: 14px;
    color: #7ABFDF;
    margin: 0;
    font-weight: 500;
    border: none;
    padding: 0;
  }

  .print-section {
    margin-bottom: 32px;
    padding: 24px 0;
    page-break-inside: avoid;
    background: transparent;
    border-top: 2px solid rgba(0, 200, 255, 0.25);
  }

  .print-section:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  .print-section h2 {
    font-size: 18px;
    font-weight: 700;
    color: #00C8FF;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    page-break-after: avoid;
    font-family: 'Exo 2', sans-serif;
  }

  .print-section h3 {
    font-size: 16px;
    font-weight: bold;
    color: #EEF6FF;
    margin: 16px 0 8px 0;
    page-break-after: avoid;
    font-family: 'Exo 2', sans-serif;
  }

  .print-section p {
    color: #7ABFDF;
    margin: 0 0 12px 0;
    line-height: 1.7;
    font-size: 15px;
  }

  .print-content-box {
    background: rgba(13, 30, 48, 0.6);
    padding: 14px 14px 14px 14px;
    margin: 12px 0;
    border-left: 3px solid rgba(0, 200, 255, 0.4);
    border-radius: 3px;
  }

  .print-content-box p {
    margin: 0;
    color: #EEF6FF;
    line-height: 1.7;
    font-size: 14px;
  }

  .print-list {
    list-style: none;
    padding: 0;
    margin: 14px 0;
  }

  .print-list li {
    margin-bottom: 11px;
    padding-left: 22px;
    position: relative;
    color: #EEF6FF;
    font-size: 14px;
    line-height: 1.7;
  }

  .print-list li::before {
    content: '→';
    color: #00C8FF;
    position: absolute;
    left: 0;
    font-size: 12px;
    font-weight: bold;
  }

  .print-calendar { margin-top: 12px; }

  .print-week {
    margin-bottom: 20px;
    page-break-inside: avoid;
    background: rgba(9, 20, 32, 0.8);
    padding: 16px;
    border-radius: 4px;
  }

  .print-week h4 {
    font-size: 13px;
    font-weight: 700;
    color: #00C8FF;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 200, 255, 0.15);
    font-family: 'Exo 2', sans-serif;
  }

  .print-day {
    margin-bottom: 12px;
    padding: 10px 0;
    background: transparent;
    border-left: 2px solid rgba(0, 200, 255, 0.25);
    padding-left: 12px;
    font-size: 14px;
  }

  .print-day-header {
    font-weight: bold;
    color: #EEF6FF;
    margin-bottom: 4px;
    font-size: 14px;
  }

  .print-day-item {
    color: #7ABFDF;
    margin-bottom: 3px;
    font-size: 15px;
  }

  .print-day-item strong {
    color: #EEF6FF;
  }

  .print-prompt-item {
    margin-bottom: 14px;
    padding: 12px;
    background: rgba(13, 30, 48, 0.5);
    border-left: 3px solid rgba(0, 200, 255, 0.35);
    page-break-inside: avoid;
    font-size: 14px;
    border-radius: 2px;
  }

  .print-prompt-header {
    font-weight: 700;
    color: #00C8FF;
    margin-bottom: 8px;
    font-size: 14px;
    font-family: 'Exo 2', sans-serif;
  }

  .print-prompt-meta {
    font-size: 13px;
    color: #7ABFDF;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .print-prompt-text {
    color: #7ABFDF;
    font-size: 14px;
    line-height: 1.5;
    font-family: 'IBM Plex Sans', monospace;
    margin: 8px 0;
  }

  .print-prompt-details {
    margin: 8px 0;
    padding: 8px 0;
    border-top: 1px solid rgba(0, 200, 255, 0.15);
  }

  .print-prompt-detail-item {
    margin-bottom: 6px;
    color: #EEF6FF;
    font-size: 14px;
  }

  .print-metadata {
    font-size: 14px;
    color: #7ABFDF;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 200, 255, 0.15);
  }

  .section-intro {
    font-size: 15px;
    color: #7ABFDF;
    margin-bottom: 16px;
    font-style: italic;
  }

  .print-table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 14px;
  }

  .print-table-header thead {
    background: rgba(0, 200, 255, 0.1);
    border-bottom: 2px solid rgba(0, 200, 255, 0.3);
  }

  .print-table-th {
    padding: 10px 12px;
    text-align: left;
    font-weight: 700;
    color: #00C8FF;
    font-family: 'Exo 2', sans-serif;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .print-table-row {
    border-bottom: 1px solid rgba(0, 200, 255, 0.1);
  }

  .print-table-row:hover {
    background: rgba(13, 30, 48, 0.4);
  }

  .print-table-cell {
    padding: 10px 12px;
    color: #EEF6FF;
    line-height: 1.5;
    vertical-align: top;
  }

  .print-table-section-header {
    background: rgba(0, 200, 255, 0.15);
    border-top: 1px solid rgba(0, 200, 255, 0.2);
    border-bottom: 1px solid rgba(0, 200, 255, 0.2);
  }

  .print-table-section-title {
    padding: 12px;
    font-weight: 700;
    color: #00C8FF;
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .print-cards {
    display: grid;
    gap: 12px;
    margin: 14px 0;
  }

  .print-card {
    background: rgba(13, 30, 48, 0.6);
    border: 1px solid rgba(0, 200, 255, 0.2);
    border-left: 3px solid rgba(0, 200, 255, 0.4);
    padding: 14px;
    border-radius: 3px;
    color: #EEF6FF;
    line-height: 1.6;
    font-size: 14px;
    page-break-inside: avoid;
  }

  .print-card-metric {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .print-card-bullet {
    color: #00C8FF;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .print-actions {
    display: flex;
    gap: 12px;
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 200, 255, 0.2);
    justify-content: flex-end;
  }

  .print-action-btn {
    padding: 10px 24px;
    border: 1px solid rgba(0, 200, 255, 0.4);
    background: transparent;
    color: #00C8FF;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .print-action-btn:hover {
    background: rgba(0, 200, 255, 0.1);
    border-color: #00C8FF;
  }

  .print-action-btn.primary {
    background: #00C8FF;
    color: #050A0E;
    border-color: #00C8FF;
  }

  .print-action-btn.primary:hover {
    background: #00D9FF;
    border-color: #00D9FF;
  }

  @media print {
    .sprint-print-template { background: #fff !important; color: #000 !important; width: 100% !important; min-height: auto !important; padding: 20px 30px !important; }
    .print-header { border-top: none !important; margin-bottom: 24px !important; }
    .print-header h1 { color: #000 !important; font-size: 28px !important; }
    .print-header p { color: #333 !important; border: none !important; font-size: 13px !important; }
    .print-section { background: transparent !important; border-top: 1px solid #ddd !important; padding: 16px 0 !important; }
    .print-section:first-of-type { border-top: none !important; }
    .print-section h2 { color: #000 !important; font-size: 16px !important; }
    .print-section h3 { color: #1a1a1a !important; }
    .print-section p { color: #333 !important; font-size: 13px !important; }
    .print-content-box { background: #f5f5f5 !important; border-left: 4px solid #000 !important; }
    .print-content-box p { color: #000 !important; font-size: 13px !important; }
    .print-list li { color: #000 !important; }
    .print-list li::before { color: #000 !important; }
    .print-week { background: transparent !important; }
    .print-week h4 { color: #000 !important; border: none !important; font-size: 12px !important; }
    .print-day { background: transparent !important; color: #333 !important; border-left: 2px solid #ccc !important; font-size: 12px !important; }
    .print-day-header { color: #000 !important; font-size: 13px !important; }
    .print-day-item { color: #333 !important; font-size: 12px !important; }
    .print-day-item strong { color: #000 !important; }
    .print-prompt-item { background: #f5f5f5 !important; color: #333 !important; border-left: 4px solid #333 !important; font-size: 12px !important; }
    .print-prompt-header { color: #000 !important; font-size: 13px !important; }
    .print-prompt-text { color: #333 !important; font-size: 12px !important; }
    .print-prompt-details { border-color: #ccc !important; }
    .print-prompt-detail-item { color: #000 !important; font-size: 12px !important; }
    .print-metadata { color: #666 !important; font-size: 11px !important; }
    .section-intro { color: #333 !important; font-size: 13px !important; font-style: italic !important; }
    button, .no-print, .print-actions { display: none !important; }
    .print-table { margin: 12px 0 !important; font-size: 12px !important; }
    .print-table-header thead { background: #e6e6e6 !important; border-bottom: 2px solid #000 !important; }
    .print-table-th { color: #000 !important; font-size: 11px !important; font-weight: bold !important; padding: 8px 10px !important; }
    .print-table-cell { color: #000 !important; border-bottom: 1px solid #ddd !important; font-size: 12px !important; padding: 7px 8px !important; }
    .print-table-row:hover { background: transparent !important; }
    .print-table-section-header { background: #f0f0f0 !important; border-top: 1px solid #ccc !important; border-bottom: 1px solid #ccc !important; }
    .print-table-section-title { color: #000 !important; font-size: 12px !important; font-weight: bold !important; padding: 8px 10px !important; }
    .print-cards { margin: 12px 0 !important; gap: 8px !important; }
    .print-card { background: #f5f5f5 !important; border: 1px solid #ccc !important; border-left: 4px solid #333 !important; color: #000 !important; font-size: 12px !important; }
    .print-card-bullet { color: #000 !important; }
  }
`;
