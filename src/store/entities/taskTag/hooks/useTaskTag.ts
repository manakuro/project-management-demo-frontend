import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskTagState } from '../atom'
import type { TaskTag } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskTag = (taskTagId?: string) => {
  const taskTag = useRecoilValue(taskTagState(taskTagId || ''))
  const { upsert } = useUpsert()

  const setTaskTag = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<TaskTag>) => {
        const prev = await snapshot.getPromise(taskTagState(taskTag.id))
        upsert({
          ...prev,
          ...input,
        })
      },
    [upsert, taskTag.id],
  )

  return {
    taskTag,
    setTaskTag,
  }
}
