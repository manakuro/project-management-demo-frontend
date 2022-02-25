import { useRecoilCallback } from 'recoil'
import { useTaskCommand } from 'src/store/entities/task'
import { useTeammateTaskCommand } from 'src/store/entities/teammateTask'

export const useMyTasksTask = () => {
  const { addTeammateTask, setTeammateTaskByTaskId } = useTeammateTaskCommand()
  const { setTaskSectionId: setTaskSectionIdCommand } = useTaskCommand()

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
      await setTaskSectionIdCommand(val.taskId, val.taskSectionId)
    },
    [setTaskSectionIdCommand, setTeammateTaskByTaskId],
  )

  return {
    addTask,
    setTaskSectionId,
  }
}
