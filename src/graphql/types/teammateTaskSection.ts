import { TeammateTaskSectionFragmentFragment } from 'src/graphql/types'

export type TeammateTaskSectionResponse =
  NonNullable<TeammateTaskSectionFragmentFragment>

export type {
  TeammateTaskSectionUpdatedSubscription,
  TeammateTaskSectionCreatedSubscription,
  UpdateTeammateTaskSectionInput,
} from 'src/graphql/types'
