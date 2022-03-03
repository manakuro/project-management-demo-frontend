import { useRecoilCallback } from 'recoil'
import { taskFileState } from '../atom'

export const useResetTaskFile = () => {
  const resetTaskFile = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskFileState(id))
      },
    [],
  )

  const resetTaskFiles = useRecoilCallback(
    ({ reset }) =>
      (taskFiles: string[]) => {
        taskFiles.forEach((id) => {
          reset(taskFileState(id))
        })
      },
    [],
  )

  return {
    resetTaskFile,
    resetTaskFiles,
  }
}
