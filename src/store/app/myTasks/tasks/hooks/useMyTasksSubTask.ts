import { useRecoilCallback } from 'recoil'
import {
  teammateTaskByTaskIdState,
  useTeammateTaskCommand,
} from 'src/store/entities/teammateTask'

export const useMyTasksSubTask = () => {
  const { addTeammateTask } = useTeammateTaskCommand()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: { taskParentId: string }) => {
        const teammateTask = await snapshot.getPromise(
          teammateTaskByTaskIdState(val.taskParentId),
        )
        return addTeammateTask({
          teammateTaskSectionId: teammateTask.teammateTaskSectionId,
          taskParentId: val.taskParentId,
        })
      },
    [addTeammateTask],
  )

  return {
    addTask,
  }
}
