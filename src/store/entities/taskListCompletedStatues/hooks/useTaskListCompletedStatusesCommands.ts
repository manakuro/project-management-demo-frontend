import { useRecoilCallback } from 'recoil'
import { taskListCompletedStatusState } from '../atom'
import { TaskListCompletedStatus } from '../type'

export const useTaskListCompletedStatusesCommands = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskListCompletedStatus: TaskListCompletedStatus) => {
        set(
          taskListCompletedStatusState(taskListCompletedStatus.id),
          taskListCompletedStatus,
        )
      },
    [],
  )

  return {
    upsert,
  }
}
