import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'
import {
  teammatesTaskSectionSelector,
  defaultTeammatesTaskSectionState,
} from '../atom'
import { TeammatesTaskSection } from '../type'

export const useTeammatesTaskSectionsCommand = () => {
  const { addTaskSection } = useTaskSectionsCommand()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammatesTaskSection) => {
        set(teammatesTaskSectionSelector(val.id), val)
      },
    [],
  )

  const addTeammatesTaskSection = useRecoilCallback(
    () => (val?: Partial<TeammatesTaskSection>) => {
      const id = uuid()
      const taskSectionId = addTaskSection()
      upsert({
        ...defaultTeammatesTaskSectionState(),
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
