import { useRecoilCallback } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsTasksCommand } from 'src/store/entities/projectTasks'
import { Task, useTasksCommand } from 'src/store/entities/tasks'

export const useProjectsTask = () => {
  const { addProjectsTask } = useProjectsTasksCommand()
  const { projectId } = useProjectsProjectId()
  const { addTask } = useTasksCommand()

  const addProjectTask = useRecoilCallback(
    () => (val: Partial<Task>) => {
      const taskId = addTask({ ...val })
      addProjectsTask({ projectId, taskId })

      return taskId
    },
    [addProjectsTask, addTask, projectId],
  )

  return {
    addTask: addProjectTask,
  }
}
