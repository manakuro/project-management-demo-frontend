import { TaskLikesQuery } from 'src/graphql/types'

export type TaskLikesQueryResponse = NonNullable<TaskLikesQuery['taskLikes']>
