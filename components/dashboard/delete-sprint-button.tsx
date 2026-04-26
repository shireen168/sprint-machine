'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeleteSprintButtonProps {
  sprintId: string;
}

export function DeleteSprintButton({ sprintId }: DeleteSprintButtonProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/sprints/${sprintId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete sprint');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 text-text-2 hover:text-red-400 transition-colors"
      title="Delete sprint"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
