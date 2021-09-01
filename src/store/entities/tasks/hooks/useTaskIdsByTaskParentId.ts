import { useRecoilCallback, useRecoilValue } from 'recoil'
import { Task } from 'src/store/entities/tasks'
import { taskIdsByTaskParentIdSelector, taskSelector } from '../atom'
import { useTasksCommand } from './useTasksCommand'

export const useTaskIdsByTaskParentId = (taskParentId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdSelector(taskParentId))
  const taskCommand = useTasksCommand()

  const addTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val?: Partial<Task>) => {
        const parentTask = await snapshot.getPromise(taskSelector(taskParentId))

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
