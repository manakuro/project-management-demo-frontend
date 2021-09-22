import { useRecoilCallback } from 'recoil'
import { useProjectsTaskSectionsCommand } from 'src/store/entities/projectsTaskSections'
import { useProjectsProjectId } from '../../project'

export const useProjectsTaskSectionCommand = () => {
  const { addProjectsTaskSection } = useProjectsTaskSectionsCommand()
  const { projectId } = useProjectsProjectId()

  const addProjectsSection = useRecoilCallback(
    () => () => {
      return addProjectsTaskSection({ projectId })
    },
    [addProjectsTaskSection, projectId],
  )

  return {
    addTaskSection: addProjectsSection,
  }
}
