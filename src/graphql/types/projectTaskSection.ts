import { ProjectTaskSectionFragmentFragment } from 'src/graphql/types'

export type ProjectTaskSectionResponse =
  NonNullable<ProjectTaskSectionFragmentFragment>

export type {
  ProjectTaskSectionUpdatedSubscription,
  ProjectTaskSectionCreatedSubscription,
  ProjectTaskSectionDeletedSubscription,
  UpdateTaskSectionInput,
} from 'src/graphql/types'
