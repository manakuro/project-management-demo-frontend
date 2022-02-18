import { TaskLikesQuery } from 'src/graphql/types'

export type TaskLikeResponse = NonNullable<
  EdgesNode<TaskLikesQuery['taskLikes']>
>

export type { TaskLikeUpdatedSubscription } from 'src/graphql/types'
