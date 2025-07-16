import type { TaskListSortStatusCode } from 'src/graphql/enums'

export { TaskListSortStatusCode } from 'src/graphql/enums'
export type TaskListSortStatusCodeKey = keyof typeof TaskListSortStatusCode

export type TaskListSortStatusCodeValue = ValueOf<typeof TaskListSortStatusCode>
