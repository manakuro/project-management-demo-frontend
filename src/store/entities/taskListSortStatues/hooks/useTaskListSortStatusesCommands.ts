import { useRecoilCallback } from 'recoil'
import { taskListSortStatusState } from '../atom'
import { TaskListSortStatus } from '../type'

export const useTaskListSortStatusesCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskListSortStatus: TaskListSortStatus) => {
        set(taskListSortStatusState(taskListSortStatus.id), taskListSortStatus)
      },
    [],
  )

  return {
    upsert,
  }
}
