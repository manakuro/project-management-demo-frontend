import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsTasksCommand } from 'src/store/entities/projectsTasks'

export const useProjectsTask = () => {
  const { addProjectTask: addTask } = useProjectsTasksCommand()
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
