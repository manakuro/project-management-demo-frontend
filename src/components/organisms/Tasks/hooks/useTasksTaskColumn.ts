import { useMyTasksTaskColumns } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumns } from 'src/store/app/projects/taskColumns'
import { useTasksContext } from '../TasksProvider'

type Result = ReturnType<
  typeof useMyTasksTaskColumns | typeof useProjectsTaskColumns
>

export const useTasksTaskColumn = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskColumnsResult = useMyTasksTaskColumns()
  const useProjectsTaskColumnsResult = useProjectsTaskColumns()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskColumnsResult,
    }
  }

  return {
    ...useProjectsTaskColumnsResult,
  }
}
