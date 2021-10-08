import { useRecoilCallback } from 'recoil'
import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { taskListStatusState } from '../atom'

export const useTaskListStatusCommand = () => {
  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskListStatus>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    setTaskStatus,
  }
}
