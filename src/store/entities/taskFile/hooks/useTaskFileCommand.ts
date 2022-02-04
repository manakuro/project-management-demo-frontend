import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { taskFileState, initialState } from '../atom'
import { TaskFile } from '../type'

export const useTaskFileCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFile: TaskFile) => {
        set(taskFileState(taskFile.id), taskFile)
      },
    [],
  )

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
    upsert,
  }
}
