import { auth } from '@clerk/nextjs/server';
import { createServiceClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { DbSprint } from '@/lib/supabase/types';
import { SprintEditPreview } from '@/components/sprint/sprint-edit-preview';

export default async function EditSprintPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { id } = await params;
  const supabase = createServiceClient() as any;
  const { data: sprint, error } = await supabase
    .from('sprints')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !sprint) redirect('/dashboard');

  const data = sprint as DbSprint;
  const output = (data.output as Record<string, any>) || {};

  return <SprintEditPreview sprintId={id} output={output} />;
}
