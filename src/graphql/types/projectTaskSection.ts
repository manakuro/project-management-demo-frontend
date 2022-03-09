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
  DeleteProjectTaskSectionAndKeepTasksMutation,
  DeleteProjectTaskSectionAndDeleteTasksMutation,
  UpdateTaskSectionInput,
} from 'src/graphql/types'
