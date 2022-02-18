import { TaskLikesQuery } from 'src/graphql/types'

export type TaskLikeResponse = NonNullable<
  EdgesNode<TaskLikesQuery['taskLikes']>
>
