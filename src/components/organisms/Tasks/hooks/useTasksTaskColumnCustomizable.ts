import { useMyTasksTaskColumnsCustomizable } from 'src/store/app/myTasks/taskColumns'
import { useProjectsTaskColumnsCustomizable } from 'src/store/app/projects/taskColumns'
import { useTasksContext } from '../TasksProvider'

type Result = {
  tasksTaskColumnIds: string[]
  setOrderTaskColumn: (updatedIds: string[]) => void
}

export const useTasksTaskColumnCustomizable = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskColumnsCustomizableResult =
    useMyTasksTaskColumnsCustomizable()
  const useProjectsTaskColumnsCustomizableResult =
    useProjectsTaskColumnsCustomizable()

  if (isMyTasksPage) {
    return {
      ...useMyTasksTaskColumnsCustomizableResult,
    }
  }

  return {
    ...useProjectsTaskColumnsCustomizableResult,
  }
}
