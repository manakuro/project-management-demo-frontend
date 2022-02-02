import { useMemo } from 'react'
import { TaskPriorityTypeValue } from '../types'
import { values } from '../values'

export const useTasksPriority = (type: TaskPriorityTypeValue) => {
  const taskPriority = useMemo(
    () => values.find((v) => v.type === type),
    [type],
  )

  return {
    taskPriority,
  }
}
