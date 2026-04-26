'use client';

import Link from 'next/link';
import { Edit2 } from 'lucide-react';

interface EditSprintButtonProps {
  sprintId: string;
}

export function EditSprintButton({ sprintId }: EditSprintButtonProps) {
  return (
    <Link
      href={`/sprint/${sprintId}/edit`}
      className="flex items-center gap-2 w-full px-3 py-2 rounded text-sm font-medium text-text-2 hover:text-gold hover:bg-surface-2 transition-colors"
      title="Edit sprint"
    >
      <Edit2 className="w-4 h-4" />
      <span>Edit Sprint</span>
    </Link>
  );
}
