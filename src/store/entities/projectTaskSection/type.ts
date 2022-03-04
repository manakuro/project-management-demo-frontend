import type { ProjectTaskSectionResponse as Response } from 'src/graphql/types/projectTaskSection'

export type {
  ProjectTaskSectionCreatedSubscription as ProjectTaskSectionCreatedSubscriptionResponse,
  ProjectTaskSectionUpdatedSubscription as ProjectTaskSectionUpdatedSubscriptionResponse,
  ProjectTaskSectionDeletedSubscription as ProjectTaskSectionDeletedSubscriptionResponse,
  ProjectTaskSectionDeletedAndKeepTasksSubscription as ProjectTaskSectionDeletedAndKeepTasksSubscriptionResponse,
  ProjectTaskSectionDeletedAndDeleteTasksSubscription as ProjectTaskSectionDeletedAndDeleteTasksSubscriptionResponse,
  DeleteProjectTaskSectionAndKeepTasksMutation,
  UpdateTaskSectionInput,
} from 'src/graphql/types/projectTaskSection'

export type ProjectTaskSectionResponse = Response & {
  isNew?: boolean
}

export type ProjectTaskSection = Omit<
  ProjectTaskSectionResponse,
  'projectTasks'
> & {
  isNew?: boolean
}
