import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsTasksCommand } from 'src/store/entities/projectsTasks'

export const useProjectsTask = () => {
  const { addProjectsTask } = useProjectsTasksCommand()
  const { projectId } = useProjectsProjectId()

  const addProjectTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      const taskId = addProjectsTask({
        projectTaskSectionId: val.taskSectionId,
      })
      addProjectsTask({ projectId, taskId })

      return taskId
    },
    [addProjectsTask, projectId],
  )

  return {
    addTask: addProjectTask,
  }
}
