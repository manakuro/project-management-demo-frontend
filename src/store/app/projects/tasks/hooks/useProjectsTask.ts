import { useRecoilCallback } from 'recoil'
import { Task, useTasksCommand } from 'src/store/entities/tasks'

export const useProjectsTask = () => {
  const { addTask } = useTasksCommand()

  const addProjectTask = useRecoilCallback(
    () => (val: Partial<Task>) => {
      return addTask({ ...val })
    },
    [addTask],
  )

  return {
    addTask: addProjectTask,
  }
}
