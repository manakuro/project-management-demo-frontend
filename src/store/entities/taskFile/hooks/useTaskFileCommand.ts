import { useCallback } from 'react'
import { uuid } from 'src/shared/uuid'
import { initialState } from '../atom'
import { TaskFile } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskFileCommand = () => {
  const { upsert } = useUpsert()

  const addTaskFile = useCallback(
    (val: Partial<TaskFile>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
      })
      return id
    },
    [upsert],
  )

  return {
    addTaskFile,
  }
}
