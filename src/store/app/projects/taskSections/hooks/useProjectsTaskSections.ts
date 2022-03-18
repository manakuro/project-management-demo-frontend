import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsTaskSectionsByProjectId } from 'src/store/entities/projectTaskSection'

export const useProjectsTaskSections = () => {
  const { projectId } = useProjectsProjectId()
  const { projectTaskSections } = useProjectsTaskSectionsByProjectId(projectId)

  return {
    taskSections: projectTaskSections,
  }
}
