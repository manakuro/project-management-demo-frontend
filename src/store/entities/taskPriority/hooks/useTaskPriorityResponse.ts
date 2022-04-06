import { useRecoilCallback } from 'recoil'
import { taskPriorityState } from '../atom'
import { TaskPriorityResponse } from '../type'

export const useTaskPriorityResponse = () => {
  const setTaskPriorities = useRecoilCallback(
    ({ set }) =>
      (data: TaskPriorityResponse[]) => {
        data.forEach((p) => {
          set(taskPriorityState(p.id), p)
        })
      },
    [],
  )

  return {
    setTaskPriorities,
  }
}
