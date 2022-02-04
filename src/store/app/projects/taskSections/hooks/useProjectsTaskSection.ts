import { useProjectTaskSection } from 'src/store/entities/projectsTaskSections'

export const useProjectsTaskSection = (taskSectionId: string) => {
  const { setProjectTaskSectionName, projectTaskSection } =
    useProjectTaskSection(taskSectionId)

  return {
    taskSection: projectTaskSection,
    setSectionName: setProjectTaskSectionName,
  }
}
