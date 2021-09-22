import { useMyTasksTaskStatus } from 'src/store/app/myTasks/taskListStatus'
import { useProjectsTaskStatus } from 'src/store/app/projects/taskListStatus'
import { useTasksContext } from '../TasksProvider'

type Result = Omit<
  ReturnType<typeof useMyTasksTaskStatus | typeof useProjectsTaskStatus>,
  'id'
>

export const useTasksTaskStatus = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskStatusResult = useMyTasksTaskStatus()
  const useProjectsTaskStatusResult = useProjectsTaskStatus()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskStatusResult,
    }
  }

  return {
    ...useProjectsTaskStatusResult,
  }
}
