import { diff } from 'deep-object-diff'
import isEqual from 'lodash-es/isEqual'
import { omit } from 'src/shared/utils/omit'
import { initialState } from './atom'
import { Task } from './type'

export const isTaskEqual = (value: Task, other: Task): boolean => {
  let omitted1: any = omit(value, 'updatedAt')
  omitted1 = omit(omitted1, 'taskSectionId')

  const task1 = {
    ...omitted1,
    taskPriority: other.taskPriority || initialState().taskPriority,
    description: {
      ...omit(value.description, '__typename' as any),
    },
  }

  let omitted2: any = omit(other, 'updatedAt')
  omitted2 = omit(omitted2, 'taskSectionId')
  const task2 = {
    ...omitted2,
    taskPriority: other.taskPriority || initialState().taskPriority,
    description: {
      ...omit(other.description, '__typename' as any),
    },
  }

  const result = isEqual(task1, task2)
  if (!result && __DEV__) {
    console.log('diff: ', diff(task1, task2))
    console.log('task1: ', task1)
    console.log('task2: ', task2)
  }

  return result
}

// Check to see if the task has been persisted in database.
export const hasTaskBeenPersisted = (task: Task): boolean => {
  return !!task.createdAt
}
