import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { initialState, taskSectionState } from '../atom'
import { TaskSection } from '../type'

export const useTaskSectionsCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskSection: TaskSection) => {
        set(taskSectionState(taskSection.id), taskSection)
      },
    [],
  )

  const addTaskSection = useCallback(
    (val?: Partial<TaskSection>) => {
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
    upsert,
    addTaskSection,
  }
}
