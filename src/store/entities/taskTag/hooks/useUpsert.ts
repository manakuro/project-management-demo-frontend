import { useRecoilCallback } from 'recoil'
import { taskTagState } from '../atom'
import { TaskTag } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskTag: TaskTag) => {
        set(taskTagState(taskTag.id), taskTag)
      },
    [],
  )

  return {
    upsert,
  }
}
