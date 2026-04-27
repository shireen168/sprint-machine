import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { createServiceClient } from '@/lib/supabase/server';
import type { DbSprint } from '@/lib/supabase/types';
import { SprintPrintTemplate } from '@/components/sprint/sprint-print-template';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SprintPrintPage({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const client = createServiceClient();
  const { id } = await params;

  const { data, error } = await client
    .from('sprints')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    redirect('/dashboard');
  }

  const sprint = data as DbSprint;

  return (
    <div style={{ background: 'white', padding: 0, margin: 0 }}>
      <SprintPrintTemplate sprint={sprint} />
    </div>
  );
}
