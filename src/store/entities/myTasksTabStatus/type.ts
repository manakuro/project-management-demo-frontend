import { MyTasksTabStatusCode } from 'src/graphql/enums'
import type { MyTasksTabStatusResponse } from 'src/graphql/types/myTasksTabStatus'

export type { MyTasksTabStatusResponse } from 'src/graphql/types/myTasksTabStatus'
export { MyTasksTabStatusCode } from 'src/graphql/enums'
export type MyTasksTabStatusCodeKey = keyof typeof MyTasksTabStatusCode

export type MyTasksTabStatus = MyTasksTabStatusResponse
