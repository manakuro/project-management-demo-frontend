import { TaskPriorityType } from 'src/graphql/enums'

export { TaskPriorityType } from 'src/graphql/enums'
export type TaskPriorityTypeKey = keyof typeof TaskPriorityType
export type TaskPriorityTypeValue = ValueOf<typeof TaskPriorityType>
