import { useRecoilCallback } from 'recoil'
import { useTeammateTaskCommand } from 'src/store/entities/teammateTask'

export const useMyTasksTask = () => {
  const { addTeammateTask, setTeammateTaskByTaskId } = useTeammateTaskCommand()

  const addTask = useRecoilCallback(
    () => (input: { taskSectionId: string }) => {
      return addTeammateTask({ teammateTaskSectionId: input.taskSectionId })
    },
    [addTeammateTask],
  )

  const setTaskSectionId = useRecoilCallback(
    () => async (input: { taskSectionId: string; taskId: string }) => {
      await setTeammateTaskByTaskId(input.taskId, {
        teammateTaskSectionId: input.taskSectionId,
      })
    },
    [setTeammateTaskByTaskId],
  )

  return {
    addTask,
    setTaskSectionId,
  }
}
