export default function NewSprintPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-gold mb-4">8-Step Sprint Intake</h1>
        <p className="text-text-2 mb-8">
          Answer 8 quick questions about your business, goals, and marketing channels.
        </p>
        <div className="space-y-4 text-left bg-surface border border-[rgba(201,169,110,0.28)] rounded-lg p-8">
          <div className="space-y-2">
            <div className="h-2 bg-surface-2 rounded w-1/4"></div>
            <div className="h-4 bg-surface-2 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-surface-2 rounded w-1/3"></div>
            <div className="h-4 bg-surface-2 rounded w-2/3"></div>
          </div>
          <p className="text-sm text-text-3 mt-6">Coming soon: intake form + AI generation</p>
        </div>
      </div>
    </div>
  )
}
