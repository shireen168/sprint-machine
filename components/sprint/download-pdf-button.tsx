'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadPdfButton() {
  const params = useParams();
  const sprintId = params.id as string;

  const handleDownload = () => {
    if (sprintId) {
      const printWindow = window.open(`/sprint/${sprintId}/print`, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          setTimeout(() => {
            printWindow.print();
          }, 500);
        });
      }
    }
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
