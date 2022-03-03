import type { TeammateTaskSectionResponse as Response } from 'src/graphql/types/teammateTaskSection'

export type {
  TeammateTaskSectionUpdatedSubscription as TeammateTaskSectionUpdatedSubscriptionResponse,
  TeammateTaskSectionCreatedSubscription as TeammateTaskSectionCreatedSubscriptionResponse,
  TeammateTaskSectionDeletedSubscription as TeammateTaskSectionDeletedSubscriptionResponse,
  TeammateTaskSectionDeletedAndKeepTasksSubscription as TeammateTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  UpdateTeammateTaskSectionInput,
} from 'src/graphql/types/teammateTaskSection'

export type TeammateTaskSectionResponse = Response & {
  isNew?: boolean
}

export type TeammateTaskSection = Omit<
  TeammateTaskSectionResponse,
  'teammateTasks'
> & {
  isNew?: boolean
}
