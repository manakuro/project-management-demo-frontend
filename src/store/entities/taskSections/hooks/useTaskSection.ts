import { useRecoilCallback, useRecoilValue } from 'recoil'
import { DEFAULT_TITLE_NAME, taskSectionSelector } from '../atom'
import { TaskSection } from '../type'
import { useTaskSectionsCommand } from './useTaskSectionsCommand'

export const useTaskSection = (taskSectionId?: string) => {
  const taskSection = useRecoilValue(taskSectionSelector(taskSectionId || ''))
  const { upsert } = useTaskSectionsCommand()

  const setTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskSection>) => {
        const prev = await snapshot.getPromise(
          taskSectionSelector(taskSection.id),
        )
        upsert({ ...prev, ...val })
      },
    [upsert, taskSection.id],
  )

  const setSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (taskSection.name === val) return
      const name = val || DEFAULT_TITLE_NAME

      await setTaskSection({ name })
    },
    [setTaskSection, taskSection.name],
  )

  return {
    taskSection,
    setTaskSection,
    setSectionName,
  }
}
