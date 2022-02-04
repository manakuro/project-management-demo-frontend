import { useRecoilCallback, useRecoilValue } from 'recoil'
import { Task } from 'src/store/entities/task'
import { taskIdsByTaskParentIdState, taskState } from '../atom'
import { useTaskCommand } from './useTaskCommand'

export const useTaskIdsByTaskParentId = (taskParentId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdState(taskParentId))
  const taskCommand = useTaskCommand()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val?: Partial<Task>) => {
        const parentTask = await snapshot.getPromise(taskState(taskParentId))

        taskCommand.addTask({
          ...val,
          taskSectionId: parentTask.taskSectionId,
          taskParentId,
        })
      },
    [taskCommand, taskParentId],
  )

  return {
    taskIds,
    addTask,
  }
}
