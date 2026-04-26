'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadPdfButton() {
  const handleDownload = () => {
    const fileName = `sprint-${new Date().toISOString().split('T')[0]}.pdf`;
    window.print();
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      variant="ghost"
      className="text-text-2 hover:text-text-1"
      title="Download sprint as PDF"
    >
      <Download className="w-4 h-4 mr-2" />
      Download
    </Button>
  );
}
