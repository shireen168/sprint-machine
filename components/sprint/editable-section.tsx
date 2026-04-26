'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface EditableSectionProps {
  title: string;
  sectionKey: string;
  value: string | string[];
  onSave: (sectionKey: string, newValue: string | string[]) => void;
  isLoading: boolean;
  isList?: boolean;
}

export function EditableSection({
  title,
  sectionKey,
  value,
  onSave,
  isLoading,
  isList = false,
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    Array.isArray(value) ? value.join('\n') : value
  );

  const handleSave = () => {
    const saveValue = isList ? editValue.split('\n').filter(Boolean) : editValue;
    onSave(sectionKey, saveValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="rounded-lg border border-gold/30 bg-surface p-6">
        <h3 className="text-lg font-semibold text-gold mb-4">Edit: {title}</h3>
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full h-48 p-3 rounded-md bg-background border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-gold/50 resize-none"
          placeholder={`Enter ${title.toLowerCase()}`}
        />
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gold text-background hover:bg-gold/90"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            variant="outline"
            className="border-white/20"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-gold bg-surface p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-text-1">{title}</h3>
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 rounded-md text-sm bg-gold text-background hover:bg-gold/90 transition-colors whitespace-nowrap"
        >
          Edit
        </button>
      </div>

      <div className="text-text-2 whitespace-pre-wrap">
        {Array.isArray(value) ? value.join('\n') : value}
      </div>
    </div>
  );
}
