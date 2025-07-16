import type { TaskColumnType } from 'src/graphql/enums'
import type { TaskColumnResponse } from 'src/graphql/types/taskColumn'
export type { TaskColumnResponse } from 'src/graphql/types/taskColumn'

export type TaskColumn = TaskColumnResponse

export { TaskColumnType } from 'src/graphql/enums'
export type TaskColumnTypeKey = keyof typeof TaskColumnType

export type TaskColumnTypeValue = ValueOf<typeof TaskColumnType>
