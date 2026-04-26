'use client';

import { useState } from 'react';
import { SprintDocLayout } from '@/components/sprint/sprint-doc-layout';
import { EditableSection } from '@/components/sprint/editable-section';

interface SprintEditPreviewProps {
  sprintId: string;
  output: Record<string, any>;
}

export function SprintEditPreview({ sprintId, output }: SprintEditPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSection = async (sectionKey: string, newValue: string | string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/sprints/${sprintId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          output: {
            ...output,
            [sectionKey]: newValue,
          },
          partialUpdate: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // Reload page to show updated content
      window.location.reload();
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SprintDocLayout sprintId={sprintId}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Edit Sprint</h1>
          <p className="text-white/60 text-sm">Click Edit on any section to modify</p>
        </div>

        <EditableSection
          title="Campaign Theme"
          sectionKey="campaign_theme"
          value={output.campaign_theme || ''}
          onSave={handleSaveSection}
          isLoading={isLoading}
        />

        <EditableSection
          title="Channel Strategy"
          sectionKey="channel_strategy"
          value={Array.isArray(output.channel_strategy) ? output.channel_strategy : []}
          onSave={handleSaveSection}
          isLoading={isLoading}
          isList={true}
        />

        <EditableSection
          title="Offer"
          sectionKey="offer"
          value={output.offer || ''}
          onSave={handleSaveSection}
          isLoading={isLoading}
        />

        <div className="pt-8 border-t border-white/10">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Back to sprint
          </button>
        </div>
      </div>
    </SprintDocLayout>
  );
}
