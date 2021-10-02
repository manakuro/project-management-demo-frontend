import { useRecoilCallback } from 'recoil'
import { taskListCompletedStatusState } from '../atom'
import { TaskListCompletedStatusResponse } from '../type'

export const useTaskListCompletedStatusesResponse = () => {
  const setTaskListCompletedStatuses = useRecoilCallback(
    ({ set }) =>
      (data: TaskListCompletedStatusResponse[]) => {
        data.forEach((d) => {
          set(taskListCompletedStatusState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskListCompletedStatuses,
  }
}
