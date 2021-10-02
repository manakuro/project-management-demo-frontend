import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskListCompletedStatusState } from '../atom'
import { TaskListCompletedStatus } from '../type'
import { useTaskListCompletedStatusesCommands } from './useTaskListCompletedStatusesCommands'

export const useTaskListCompletedStatus = (
  taskListCompletedStatusId?: string,
) => {
  const taskListCompletedStatus = useRecoilValue(
    taskListCompletedStatusState(taskListCompletedStatusId || ''),
  )
  const { upsert } = useTaskListCompletedStatusesCommands()

  const setTaskListCompletedStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskListCompletedStatus>) => {
        const prev = await snapshot.getPromise(
          taskListCompletedStatusState(taskListCompletedStatus.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskListCompletedStatus.id],
  )

  return {
    taskListCompletedStatus,
    setTaskListCompletedStatus,
  }
}
