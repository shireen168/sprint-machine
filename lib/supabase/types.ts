export type UserTier = 'free' | 'pro'
export type SprintStatus = 'generating' | 'complete' | 'failed'

export type DbUser = {
  id: string
  email: string
  tier: UserTier
  stripe_customer_id: string | null
  sprint_count_this_month: number
  created_at: string
}

export type DbSprint = {
  id: string
  user_id: string
  title: string
  goal: string | null
  channels: string[]
  intake: Record<string, unknown>
  output: Record<string, unknown> | null
  status: SprintStatus
  created_at: string
  updated_at: string
}

export type DbSprintReview = {
  id: string
  sprint_id: string
  user_id: string
  results_input: string
  diagnosis: Record<string, unknown> | null
  next_sprint_id: string | null
  created_at: string
}

export type DbApiUsageLog = {
  id: string
  user_id: string
  operation: string
  model: string
  input_tokens: number
  output_tokens: number
  cached_tokens: number
  cost_usd: number
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      users: { Row: DbUser; Insert: Omit<DbUser, 'created_at'>; Update: Partial<Omit<DbUser, 'id'>> }
      sprints: { Row: DbSprint; Insert: Omit<DbSprint, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<DbSprint, 'id'>> }
      sprint_reviews: { Row: DbSprintReview; Insert: Omit<DbSprintReview, 'id' | 'created_at'>; Update: Partial<Omit<DbSprintReview, 'id'>> }
      api_usage_log: { Row: DbApiUsageLog; Insert: Omit<DbApiUsageLog, 'id' | 'created_at'>; Update: never }
    }
  }
}
