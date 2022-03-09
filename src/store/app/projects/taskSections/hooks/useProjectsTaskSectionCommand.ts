import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionCommand as useCommand } from 'src/store/entities/projectTaskSection'
import { useProjectsProjectId } from '../../project'

export const useProjectsTaskSectionCommand = () => {
  const {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  } = useCommand()
  const { projectId } = useProjectsProjectId()

  const addTaskSection = useRecoilCallback(
    () => () => {
      return addProjectsTaskSection({ projectId })
    },
    [addProjectsTaskSection, projectId],
  )

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  }
}
