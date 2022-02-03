import { useRecoilCallback } from 'recoil'
import { useTeammateTasksCommand } from 'src/store/entities/teammateTasks'

export const useMyTasksTask = () => {
  const { addTeammateTask } = useTeammateTasksCommand()

  const addMyTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addTeammateTask({ teammateTaskSectionId: val.taskSectionId })
    },
    [addTeammateTask],
  )

  return {
    addTask: addMyTask,
  }
}
