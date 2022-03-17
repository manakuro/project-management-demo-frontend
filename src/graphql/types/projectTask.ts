import { ProjectTaskFragmentFragment } from 'src/graphql/types'

export type ProjectTaskResponse = NonNullable<ProjectTaskFragmentFragment>
export type {
  ProjectTaskCreatedSubscription as ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskUpdatedSubscription as ProjectTaskUpdatedSubscriptionResponse,
  ProjectTaskCreatedByTaskIdSubscription as ProjectTaskCreatedByTaskIdSubscriptionResponse,
} from 'src/graphql/types'
