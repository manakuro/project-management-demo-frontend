import { TaskPriorityType } from './types'

export const values = [
  {
    type: TaskPriorityType.Low,
    text: 'Low',
    color: 'green.400',
  },
  {
    type: TaskPriorityType.Medium,
    text: 'Medium',
    color: 'orange.400',
  },
  {
    type: TaskPriorityType.High,
    text: 'High',
    color: 'red.400',
  },
] as const
type Values = typeof values
type Types = Values[number]['type']

export const findTextByCode = (type: Types) =>
  values.find((v) => v.type === type)?.text || ''
