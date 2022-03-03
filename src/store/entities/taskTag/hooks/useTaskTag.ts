import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskTagState } from '../atom'
import { TaskTag } from '../type'
import { useUpsert } from './useUpsert'

export const useTaskTag = (taskTagId?: string) => {
  const taskTag = useRecoilValue(taskTagState(taskTagId || ''))
  const { upsert } = useUpsert()

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
