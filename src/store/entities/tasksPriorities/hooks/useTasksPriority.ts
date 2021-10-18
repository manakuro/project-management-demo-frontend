import { useMemo } from 'react'
import { TasksPriorityTypes } from '../types'
import { values } from '../values'

export const useTasksPriority = (type: TasksPriorityTypes) => {
  const taskPriority = useMemo(
    () => values.find((v) => v.type === type),
    [type],
  )

  return {
    taskPriority,
  }
}
