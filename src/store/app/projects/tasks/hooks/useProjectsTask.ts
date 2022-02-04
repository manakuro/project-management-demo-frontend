import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsTaskCommand } from 'src/store/entities/projectsTask'

export const useProjectsTask = () => {
  const { addProjectTask: addTask } = useProjectsTaskCommand()
  const { projectId } = useProjectsProjectId()

  const addProjectTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addTask({
        projectId,
        projectTaskSectionId: val.taskSectionId,
      })
    },
    [addTask, projectId],
  )

  return {
    addTask: addProjectTask,
  }
}
