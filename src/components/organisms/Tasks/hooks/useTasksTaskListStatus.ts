import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { useProjectsTaskListStatus } from 'src/store/app/projects/taskListStatus'
import { useTasksContext } from '../TasksProvider'

type Result = Omit<
  ReturnType<
    typeof useMyTasksTaskListStatus | typeof useProjectsTaskListStatus
  >,
  'id'
>

export const useTasksTaskListStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskListStatusResult = useMyTasksTaskListStatus()
  const useProjectsTaskListStatusResult = useProjectsTaskListStatus()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskListStatusResult,
    }
  }

  return {
    ...useProjectsTaskListStatusResult,
  }
}
