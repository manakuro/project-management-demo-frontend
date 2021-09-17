import { useTaskSection } from 'src/store/entities/taskSections'
import { useMyTasksTaskIdsByTaskSectionId } from '../tasks'

export const useMyTaskByTaskSectionId = (taskSectionId: string) => {
  const { setSectionName, taskSection } = useTaskSection(taskSectionId)
  const { taskIds } = useMyTasksTaskIdsByTaskSectionId(taskSectionId)

  return {
    taskSection,
    taskIds,
    setSectionName,
  }
}
