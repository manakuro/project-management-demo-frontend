import type { TeammateTaskSectionResponse } from 'src/graphql/types/teammateTaskSection'

export type {
  TeammateTaskSectionResponse,
  TeammateTaskSectionUpdatedSubscription as TeammateTaskSectionUpdatedSubscriptionResponse,
} from 'src/graphql/types/teammateTaskSection'

export type TeammateTaskSection = Omit<
  TeammateTaskSectionResponse,
  'teammateTasks'
>
