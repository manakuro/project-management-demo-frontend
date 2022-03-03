import { TeammateTaskSectionFragmentFragment } from 'src/graphql/types'

export type TeammateTaskSectionResponse =
  NonNullable<TeammateTaskSectionFragmentFragment>

export type {
  TeammateTaskSectionUpdatedSubscription,
  TeammateTaskSectionCreatedSubscription,
  TeammateTaskSectionDeletedSubscription,
  TeammateTaskSectionDeletedAndKeepTasksSubscription,
  TeammateTaskSectionDeletedAndDeleteTasksSubscription,
  UpdateTeammateTaskSectionInput,
} from 'src/graphql/types'
