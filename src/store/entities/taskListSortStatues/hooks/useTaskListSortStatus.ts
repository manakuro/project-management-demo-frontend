import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskListSortStatusState } from '../atom'
import { TaskListSortStatus } from '../type'
import { useTaskListSortStatusesCommands } from './useTaskListSortStatusesCommands'

export const useTaskListSortStatus = (taskListSortStatusId?: string) => {
  const taskListSortStatus = useRecoilValue(
    taskListSortStatusState(taskListSortStatusId || ''),
  )
  const { upsert } = useTaskListSortStatusesCommands()

  const setTaskListSortStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskListSortStatus>) => {
        const prev = await snapshot.getPromise(
          taskListSortStatusState(taskListSortStatus.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskListSortStatus.id],
  )

  return {
    taskListSortStatus,
    setTaskListSortStatus,
  }
}
