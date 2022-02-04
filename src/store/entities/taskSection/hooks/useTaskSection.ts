import { useRecoilCallback, useRecoilValue } from 'recoil'
import { DEFAULT_TITLE_NAME, taskSectionState } from '../atom'
import { TaskSection } from '../type'
import { useTaskSectionCommand } from './useTaskSectionCommand'

export const useTaskSection = (taskSectionId?: string) => {
  const taskSection = useRecoilValue(taskSectionState(taskSectionId || ''))
  const { upsert } = useTaskSectionCommand()

  const setTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskSection>) => {
        const prev = await snapshot.getPromise(taskSectionState(taskSection.id))
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
