import { useRecoilCallback } from 'recoil'
import { taskTagState } from '../atom'
import { TaskTag } from '../type'

export const useTaskTagCommand = () => {
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
