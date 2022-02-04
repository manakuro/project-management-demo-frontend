import { useRecoilCallback, useRecoilValue } from 'recoil'
import { tagState } from '../atom'
import { TaskTag } from '../type'
import { useTagCommand } from './useTagCommand'

export const useTag = (tagId?: string) => {
  const taskTag = useRecoilValue(tagState(tagId || ''))
  const { upsert } = useTagCommand()

  const setTaskTag = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskTag>) => {
        const prev = await snapshot.getPromise(tagState(taskTag.id))
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
