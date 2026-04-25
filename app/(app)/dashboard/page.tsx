import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { createServiceClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null; // Auth guard at middleware level, but just in case
  }

  const supabase = createServiceClient();

  // Fetch sprints for this user
  const { data: sprintsData } = await supabase
    .from('sprints')
    .select('id, title, goal, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  const sprints = (sprintsData as any[]) || [];

  const buttonClass = 'inline-block px-6 py-2 rounded-md bg-gold text-background hover:bg-gold-light shadow-glow-rest hover:shadow-glow-hover transition-all font-medium';
  const hasSprints = sprints && sprints.length > 0;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-1">Your Sprints</h1>
          <p className="mt-1 text-text-2">Each sprint is your complete 30-day marketing plan.</p>
        </div>
        <Link href="/sprint/new" className={buttonClass}>
          New Sprint
        </Link>
      </div>

      {!hasSprints ? (
        <div className="rounded-xl border border-border-gold bg-surface p-12 text-center shadow-glow-rest">
          <p className="font-display text-xl text-text-1">No sprints yet</p>
          <p className="mt-2 text-text-2">Create your first sprint to get your 30-day marketing plan.</p>
          <Link href="/sprint/new" className={`mt-6 ${buttonClass}`}>
            Create first sprint
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sprints.map((sprint) => {
            const statusColor =
              sprint.status === 'complete'
                ? 'text-green-400'
                : sprint.status === 'generating'
                  ? 'text-yellow-400'
                  : 'text-red-400';

            const createdDate = new Date(sprint.created_at).toLocaleDateString(
              'en-US',
              { month: 'short', day: 'numeric', year: 'numeric' }
            );

            return (
              <Link
                key={sprint.id}
                href={`/sprint/${sprint.id}`}
                className="group rounded-lg border border-border-gold bg-surface p-6 hover:bg-surface-2 transition-colors shadow-glow-rest hover:shadow-glow-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-text-1 group-hover:text-gold transition-colors line-clamp-2">
                      {sprint.title}
                    </h3>
                    <span className={`text-xs font-medium whitespace-nowrap ${statusColor}`}>
                      {sprint.status}
                    </span>
                  </div>
                  <p className="text-text-3 text-sm line-clamp-2">{sprint.goal}</p>
                  <p className="text-text-3 text-xs">{createdDate}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
