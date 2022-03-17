import { ProjectFragmentFragment } from 'src/graphql/types'

export type ProjectResponse = NonNullable<ProjectFragmentFragment>
export type {
  ProjectUpdatedSubscription as ProjectUpdatedSubscriptionResponse,
  ProjectsQuery,
} from 'src/graphql/types'
