import type { TeammateTaskSectionResponse as Response } from 'src/graphql/types/teammateTaskSection'

export type {
  TeammateTaskSectionUpdatedSubscriptionResponse,
  TeammateTaskSectionCreatedSubscriptionResponse,
  TeammateTaskSectionDeletedSubscriptionResponse,
  TeammateTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  TeammateTaskSectionDeletedAndDeleteTasksSubscriptionResponse,
  TeammateTaskSectionUndeletedAndKeepTasksSubscriptionResponse,
  TeammateTaskSectionUndeletedAndDeleteTasksSubscriptionResponse,
  DeleteTeammateTaskSectionAndKeepTasksMutation,
  DeleteTeammateTaskSectionAndDeleteTasksMutation,
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
