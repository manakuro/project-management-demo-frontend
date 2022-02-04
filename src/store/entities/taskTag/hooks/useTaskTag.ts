import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskTagState } from '../atom'
import { TaskTag } from '../type'
import { useTaskTagCommand } from './useTaskTagCommand'

export const useTaskTag = (taskTagId?: string) => {
  const taskTag = useRecoilValue(taskTagState(taskTagId || ''))
  const { upsert } = useTaskTagCommand()

  const setTaskTag = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskTag>) => {
        const prev = await snapshot.getPromise(taskTagState(taskTag.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskTag.id],
  )

  return {
    taskTag,
    setTaskTag,
  }
}
