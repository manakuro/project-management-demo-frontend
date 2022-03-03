import { useRecoilCallback } from 'recoil'
import { taskTagState } from '../atom'

export const useResetTaskTag = () => {
  const resetTaskTag = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskTagState(id))
      },
    [],
  )

  const resetTaskTags = useRecoilCallback(
    ({ reset }) =>
      (taskTags: string[]) => {
        taskTags.forEach((id) => {
          reset(taskTagState(id))
        })
      },
    [],
  )

  return {
    resetTaskTag,
    resetTaskTags,
  }
}
