import type { TaskLikesQuery } from 'src/graphql/types';

export type TaskLikesQueryResponse = NonNullable<TaskLikesQuery['taskLikes']>;
