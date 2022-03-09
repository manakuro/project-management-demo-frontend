import { useRecoilCallback } from 'recoil'
import { useTeammateTaskCommand } from 'src/store/entities/teammateTask'

export const useMyTasksTask = () => {
  const { addTeammateTask, setTeammateTaskByTaskId } = useTeammateTaskCommand()

  const addTask = useRecoilCallback(
    () => (val: { taskSectionId: string }) => {
      return addTeammateTask({ teammateTaskSectionId: val.taskSectionId })
    },
    [addTeammateTask],
  )

  const setTaskSectionId = useRecoilCallback(
    () => async (val: { taskSectionId: string; taskId: string }) => {
      await setTeammateTaskByTaskId(val.taskId, {
        teammateTaskSectionId: val.taskSectionId,
      })
    },
    [setTeammateTaskByTaskId],
  )

  return {
    addTask,
    setTaskSectionId,
  }
}
