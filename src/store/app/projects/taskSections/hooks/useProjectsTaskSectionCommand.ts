import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionCommand as useCommand } from 'src/store/entities/projectTaskSection'
import { useProjectsProjectId } from '../../project'

export const useProjectsTaskSectionCommand = () => {
  const { addProjectsTaskSection } = useCommand()
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
