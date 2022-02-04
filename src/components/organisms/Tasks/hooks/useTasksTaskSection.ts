import { useMyTasksTaskSection } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSection } from 'src/store/app/projects/taskSections'
import { useTasksContext } from '../TasksProvider'

type Result = {
  taskSection: {
    id: string
    name: string
  }
  setSectionName: (val: string) => Promise<void>
}

export const useTasksTaskSection = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext()
  const useMyTasksTaskSectionResult = useMyTasksTaskSection(taskSectionId)
  const useProjectsTaskSectionResult = useProjectsTaskSection(taskSectionId)

  if (isMyTasksPage) {
    return {
      taskSection: useMyTasksTaskSectionResult.taskSection,
      setSectionName: useMyTasksTaskSectionResult.setSectionName,
    }
  }

  return {
    taskSection: useProjectsTaskSectionResult.taskSection,
    setSectionName: useProjectsTaskSectionResult.setSectionName,
  }
}
