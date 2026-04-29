import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { createServiceClient } from '@/lib/supabase/server';
import { DeleteSprintButton } from '@/components/dashboard/delete-sprint-button';
import { NewSprintButton } from '@/components/dashboard/new-sprint-button';

const formatSprintTitle = (title: string) => {
  const productName = title.split(' - ')[0];
  return productName
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null; // Auth guard at middleware level, but just in case
  }

  const supabase = createServiceClient();
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch user's sprint count
  const { data: userRow } = await supabase
    .from('users')
    .select('sprint_count_this_month, sprint_month')
    .eq('id', userId)
    .single() as any;

  const effectiveCount = userRow?.sprint_month !== currentMonth ? 0 : (userRow?.sprint_count_this_month ?? 0);
  const nextReset = new Date();
  nextReset.setMonth(nextReset.getMonth() + 1, 1);
  nextReset.setHours(0, 0, 0, 0);
  const nextResetDate = nextReset.toISOString().slice(0, 10);

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
          <p className="mt-1 text-text-2">Latest sprints appear first.</p>
        </div>
        <NewSprintButton
          sprintsUsed={effectiveCount}
          limit={2}
          nextResetDate={nextResetDate}
        />
      </div>

      {!hasSprints ? (
        <div className="rounded-xl border border-border-gold bg-surface p-12 text-center shadow-glow-rest">
          <p className="font-display text-xl text-text-1">No sprints yet</p>
          <p className="mt-2 text-text-2">Create your first marketing sprint to get started.</p>
          <Link href="/sprint/new" className={`mt-6 ${buttonClass}`}>
            Create first sprint
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-gold">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-gold bg-surface-2">
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-2 w-12">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-2">Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-2">Goal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-2 w-24">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-2 w-32">Created</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-2 w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sprints.map((sprint, idx) => {
                const statusColor =
                  sprint.status === 'complete'
                    ? 'text-green-400'
                    : sprint.status === 'draft'
                      ? 'text-yellow-400'
                      : sprint.status === 'generating'
                        ? 'text-blue-400'
                        : 'text-red-400';

                const createdDate = new Date(sprint.created_at).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                );

                return (
                  <tr key={sprint.id} className="border-b border-border-gold hover:bg-surface-2 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-display font-bold text-text-1">{idx + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/sprint/${sprint.id}`}
                        className="font-medium text-text-1 hover:text-gold transition-colors truncate block"
                      >
                        {formatSprintTitle(sprint.title)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-3 text-sm truncate">{sprint.goal}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${statusColor}`}>
                        {sprint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-3 text-sm">{createdDate}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteSprintButton sprintId={sprint.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
