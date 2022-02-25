import { ProjectTaskFragmentFragment } from 'src/graphql/types'

export type ProjectTaskResponse = NonNullable<ProjectTaskFragmentFragment>
export type {
  ProjectTaskCreatedSubscription,
  ProjectTaskUpdatedSubscription,
} from 'src/graphql/types'
