import type { DeletedTaskResponse } from 'src/graphql/types/deletedTask'

export type { DeletedTaskResponse } from 'src/graphql/types/deletedTask'

export type DeletedTask = Omit<DeletedTaskResponse, 'task'>
