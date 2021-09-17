import { useTaskSection } from 'src/store/entities/taskSections'

export const useMyTasksTaskSection = (taskSectionId: string) => {
  const { setSectionName, taskSection } = useTaskSection(taskSectionId)

  return {
    taskSection,
    setSectionName,
  }
}
