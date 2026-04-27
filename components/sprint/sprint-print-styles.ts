export const printStyles = `
  .sprint-print-template {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: white;
    padding: 40px;
    max-width: 8.5in;
    margin: 0 auto;
  }

  @media print {
    .sprint-print-template { padding: 40px; background: white !important; }
    button, .no-print { display: none !important; }
  }

  .print-header {
    border-bottom: 4px solid #C9A96E;
    padding-bottom: 24px;
    margin-bottom: 32px;
    page-break-after: avoid;
  }

  .print-header h1 {
    font-size: 28px;
    font-weight: bold;
    color: #C9A96E;
    margin: 0 0 8px 0;
  }

  .print-header p {
    font-size: 12px;
    color: #888;
    margin: 0;
    font-weight: 500;
  }

  .print-section {
    margin-bottom: 32px;
    page-break-inside: avoid;
    background: #fafafa;
    padding: 20px;
    border-radius: 6px;
    border-left: 4px solid #C9A96E;
  }

  .print-section h2 {
    font-size: 16px;
    font-weight: bold;
    color: #C9A96E;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    page-break-after: avoid;
  }

  .print-section h3 {
    font-size: 13px;
    font-weight: bold;
    color: #2c2c2c;
    margin: 16px 0 8px 0;
    page-break-after: avoid;
  }

  .print-section p {
    color: #555;
    margin: 0 0 12px 0;
    line-height: 1.7;
    font-size: 12px;
  }

  .print-content-box {
    background: white;
    border-left: 3px solid #C9A96E;
    padding: 14px;
    margin: 12px 0;
    border-radius: 4px;
  }

  .print-content-box p {
    margin: 0;
    color: #333;
    line-height: 1.7;
    font-size: 13px;
  }

  .print-list {
    list-style: none;
    padding: 0;
    margin: 12px 0;
  }

  .print-list li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
    color: #333;
    font-size: 12px;
    line-height: 1.6;
  }

  .print-list li::before {
    content: '▪';
    color: #C9A96E;
    position: absolute;
    left: 0;
    font-size: 12px;
    font-weight: bold;
  }

  .print-calendar { margin-top: 12px; }

  .print-week {
    margin-bottom: 20px;
    page-break-inside: avoid;
    background: white;
    padding: 12px;
    border-radius: 4px;
  }

  .print-week h4 {
    font-size: 12px;
    font-weight: bold;
    color: #C9A96E;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #E8D5B0;
    padding-bottom: 6px;
  }

  .print-day {
    margin-bottom: 12px;
    padding: 10px;
    background: #f5f5f5;
    border-left: 3px solid #D4AF8C;
    border-radius: 3px;
    font-size: 12px;
  }

  .print-day-header {
    font-weight: bold;
    color: #2c2c2c;
    margin-bottom: 4px;
  }

  .print-day-item {
    color: #555;
    margin-bottom: 3px;
    font-size: 12px;
  }

  .print-day-item strong {
    color: #333;
  }

  .print-prompt-item {
    margin-bottom: 14px;
    padding: 12px;
    background: white;
    border-left: 3px solid #D4AF8C;
    border-radius: 4px;
    page-break-inside: avoid;
    font-size: 12px;
  }

  .print-prompt-header {
    font-weight: bold;
    color: #2c2c2c;
    margin-bottom: 6px;
    font-size: 12px;
  }

  .print-prompt-meta {
    font-size: 11px;
    color: #888;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .print-prompt-text {
    color: #333;
    font-size: 11px;
    line-height: 1.5;
    font-family: monospace;
    margin: 8px 0;
  }

  .print-prompt-details {
    margin: 8px 0;
    padding: 8px 0;
    border-top: 1px solid #ddd;
  }

  .print-prompt-detail-item {
    margin-bottom: 6px;
    color: #333;
    font-size: 11px;
  }

  .print-metadata {
    font-size: 11px;
    color: #999;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #e0e0e0;
  }

  .section-intro {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    font-style: italic;
  }
`;
