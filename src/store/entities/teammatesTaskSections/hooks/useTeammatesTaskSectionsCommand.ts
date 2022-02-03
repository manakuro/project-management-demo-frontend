import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'
import { teammatesTaskSectionState, initialState } from '../atom'
import { TeammateTaskSection } from '../type'

export const useTeammatesTaskSectionsCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTaskSection) => {
        set(teammatesTaskSectionState(val.id), val)
      },
    [],
  )

  const addTeammatesTaskSection = useRecoilCallback(
    () => (val?: Partial<TeammateTaskSection>) => {
      const id = uuid()
      const taskSectionId = addTaskSection()
      upsert({
        ...initialState(),
        ...val,
        id,
      })

      return taskSectionId
    },
    [upsert, addTaskSection],
  )

  return {
    addTeammatesTaskSection,
  }
}
