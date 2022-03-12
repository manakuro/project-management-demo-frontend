import { useRecoilCallback } from 'recoil'
import {
  teammateTaskByTaskIdState,
  useTeammateTaskCommand,
} from 'src/store/entities/teammateTask'

export const useMyTasksSubTask = () => {
  const { addTeammateTask } = useTeammateTaskCommand()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { taskParentId: string }) => {
        const teammateTask = await snapshot.getPromise(
          teammateTaskByTaskIdState(input.taskParentId),
        )
        return addTeammateTask({
          teammateTaskSectionId: teammateTask.teammateTaskSectionId,
          taskParentId: input.taskParentId,
        })
      },
    [addTeammateTask],
  )

  return {
    addTask,
  }
}
