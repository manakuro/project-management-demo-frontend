import { useRecoilCallback } from 'recoil'
import { useTeammateTaskCommand } from 'src/store/entities/teammateTask'

export const useMyTasksTask = () => {
  const { addTeammateTask, deleteTeammateTask } = useTeammateTaskCommand()

  const addMyTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addTeammateTask({ teammateTaskSectionId: val.taskSectionId })
    },
    [addTeammateTask],
  )

  return {
    addTask: addMyTask,
    deleteTask: deleteTeammateTask,
  }
}
