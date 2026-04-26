import { auth } from '@clerk/nextjs/server';
import { createServiceClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SprintWizardLayout } from '@/components/wizard/sprint-wizard-layout';

export default async function EditSprintPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { id } = await params;
  const supabase = createServiceClient() as any;
  const { data: sprint, error } = await supabase
    .from('sprints')
    .select('id, intake, title')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !sprint) redirect('/dashboard');

  return <SprintWizardLayout editMode={true} initialValues={sprint.intake} sprintId={id} initialStep={8} />;
}
