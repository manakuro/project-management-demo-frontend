import { ProjectTaskSectionFragmentFragment } from 'src/graphql/types'

export type ProjectTaskSectionResponse =
  NonNullable<ProjectTaskSectionFragmentFragment>

export type {
  ProjectTaskSectionUpdatedSubscription,
  ProjectTaskSectionCreatedSubscription,
  ProjectTaskSectionDeletedSubscription,
  ProjectTaskSectionDeletedAndKeepTasksSubscription,
  ProjectTaskSectionDeletedAndDeleteTasksSubscription,
  ProjectTaskSectionUndeletedAndKeepTasksSubscription,
  ProjectTaskSectionUndeletedAndDeleteTasksSubscription,
  DeleteProjectTaskSectionAndKeepTasksMutation,
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  UpdateTaskSectionInput,
} from 'src/graphql/types'
