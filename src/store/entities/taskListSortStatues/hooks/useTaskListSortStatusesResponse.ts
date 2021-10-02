import { useRecoilCallback } from 'recoil'
import { taskListSortStatusState } from '../atom'
import { TaskListSortStatusResponse } from '../type'

export const useTaskListSortStatusesResponse = () => {
  const setTaskListSortStatuses = useRecoilCallback(
    ({ set }) =>
      (data: TaskListSortStatusResponse[]) => {
        data.forEach((d) => {
          set(taskListSortStatusState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskListSortStatuses,
  }
}
