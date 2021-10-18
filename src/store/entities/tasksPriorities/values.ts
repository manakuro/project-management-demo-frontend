import {
  TASKS_PRIORITY_TYPE_LOW,
  TASKS_PRIORITY_TYPE_MEDIUM,
  TASKS_PRIORITY_TYPE_HIGH,
} from './types'

export const values = [
  {
    type: TASKS_PRIORITY_TYPE_LOW,
    text: 'Low',
    color: 'green.400',
  },
  {
    type: TASKS_PRIORITY_TYPE_MEDIUM,
    text: 'Medium',
    color: 'orange.400',
  },
  {
    type: TASKS_PRIORITY_TYPE_HIGH,
    text: 'High',
    color: 'red.400',
  },
] as const
type Values = typeof values
type Types = Values[number]['type']

export const findTextByCode = (type: Types) =>
  values.find((v) => v.type === type)?.text || ''
