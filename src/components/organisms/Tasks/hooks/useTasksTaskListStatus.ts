import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { useProjectsTaskStatus } from 'src/store/app/projects/taskListStatus'
import { useTasksContext } from '../TasksProvider'

type Result = Omit<
  ReturnType<typeof useMyTasksTaskListStatus | typeof useProjectsTaskStatus>,
  'id'
>

export const useTasksTaskListStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskListStatusResult = useMyTasksTaskListStatus()
  const useProjectsTaskStatusResult = useProjectsTaskStatus()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskListStatusResult,
    }
  }

  return {
    ...useProjectsTaskStatusResult,
  }
}
