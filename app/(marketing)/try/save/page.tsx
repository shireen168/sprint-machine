import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServiceClient } from '@/lib/supabase/server';

interface GuestSprint {
  intake: Record<string, any>;
  output: Record<string, any>;
  generatedAt: string;
}

export default async function TrySavePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?redirect=/try/save');
  }

  try {
    const cookieStore = await cookies();
    const guestSprintCookie = cookieStore.get('guest_sprint')?.value;

    if (!guestSprintCookie) {
      redirect('/dashboard');
    }

    const guestSprint: GuestSprint = JSON.parse(decodeURIComponent(guestSprintCookie));
    const supabase = createServiceClient() as any;

    // Ensure user exists in users table
    await supabase
      .from('users')
      .upsert({ id: userId })
      .select()
      .single();

    // Insert sprint to Supabase
    const { data, error } = await supabase
      .from('sprints')
      .insert({
        user_id: userId,
        title: `${guestSprint.intake.product} - ${guestSprint.intake.goal}`,
        goal: guestSprint.intake.goal,
        intake: guestSprint.intake,
        output: guestSprint.output,
        status: 'complete',
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('[try-save] Supabase error:', error);
      redirect('/dashboard');
    }

    // Clear the cookie
    cookieStore.delete('guest_sprint');

    // Redirect to the newly saved sprint
    redirect(`/sprint/${data.id}`);
  } catch (error) {
    console.error('[try-save] Error:', error);
    redirect('/dashboard');
  }
}
