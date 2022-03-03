import { ProjectTaskSectionFragmentFragment } from 'src/graphql/types'

export type ProjectTaskSectionResponse =
  NonNullable<ProjectTaskSectionFragmentFragment>

export type {
  ProjectTaskSectionUpdatedSubscription,
  ProjectTaskSectionCreatedSubscription,
  ProjectTaskSectionDeletedSubscription,
  ProjectTaskSectionDeletedAndKeepTasksSubscription,
  ProjectTaskSectionDeletedAndDeleteTasksSubscription,
  UpdateTaskSectionInput,
} from 'src/graphql/types'
