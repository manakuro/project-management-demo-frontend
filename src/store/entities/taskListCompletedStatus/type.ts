import type { TaskListCompletedStatusCode } from 'src/graphql/enums'

export { TaskListCompletedStatusCode } from 'src/graphql/enums'
export type TaskListCompletedStatusCodeKey =
  keyof typeof TaskListCompletedStatusCode

export type TaskListCompletedStatusCodeValue = ValueOf<
  typeof TaskListCompletedStatusCode
>
