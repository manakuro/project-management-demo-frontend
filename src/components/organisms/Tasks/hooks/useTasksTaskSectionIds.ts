import { useMyTasksTaskSectionIds } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSectionIds } from 'src/store/app/projects/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSectionIds: string[]
}

export const useTasksTaskSectionIds = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskSectionIdsResult = useMyTasksTaskSectionIds()
  const useProjectsTaskSectionIdsResult = useProjectsTaskSectionIds()

  if (isMyTasksPage) {
    return {
      taskSectionIds: useMyTasksTaskSectionIdsResult.taskSectionIds,
    }
  }

  return {
    taskSectionIds: useProjectsTaskSectionIdsResult.taskSectionIds,
  }
}
