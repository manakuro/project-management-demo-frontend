import { useRecoilCallback } from 'recoil'
import { taskFileState } from '../atom'
import { TaskFileResponse } from '../type'

export const useTaskFileResponse = () => {
  const setTaskFiles = useRecoilCallback(
    ({ set }) =>
      (data: TaskFileResponse[]) => {
        data.forEach((d) => {
          set(taskFileState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskFiles,
  }
}
