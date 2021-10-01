import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'
import {
  teammatesTaskSectionState,
  initialTeammatesTaskSectionState,
} from '../atom'
import { TeammatesTaskSection } from '../type'

export const useTeammatesTaskSectionsCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammatesTaskSection) => {
        set(teammatesTaskSectionState(val.id), val)
      },
    [],
  )

  const addTeammatesTaskSection = useRecoilCallback(
    () => (val?: Partial<TeammatesTaskSection>) => {
      const id = uuid()
      const taskSectionId = addTaskSection()
      upsert({
        ...initialTeammatesTaskSectionState(),
        ...val,
        taskSectionId,
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
