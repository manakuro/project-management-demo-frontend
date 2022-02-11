import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskMutation } from 'src/graphql/hooks'
import { taskState } from '../atom'
import { Task } from '../type'
import { useTaskCommand } from './useTaskCommand'

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskState(taskId || ''))
  const { upsert } = useTaskCommand()
  const [updateTaskMutation] = useUpdateTaskMutation()

  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task>) => {
        if (!taskId) return
        const current = await snapshot.getPromise(taskState(taskId))

        upsert({
          ...current,
          ...val,
        })

        const res = await updateTaskMutation({
          variables: {
            input: {
              id: taskId,
              ...val,
            },
          },
        })

        if (res.errors) {
          upsert(current)
        }
      },
    [taskId, updateTaskMutation, upsert],
  )
  const setTaskPriority = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task['taskPriority']>) => {
        if (!taskId) return

        const prev = await snapshot.getPromise(taskState(taskId))
        await setTask({
          taskPriority: {
            ...prev.taskPriority,
            ...val,
          },
        })
      },
    [taskId, setTask],
  )

  // TODO(deleted task): Implement deleted functionality
  const deleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: true } as any)
    },
    [setTask],
  )
  const undeleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: false } as any)
    },
    [setTask],
  )

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (val: string) => {
        const current = await snapshot.getPromise(taskState(task.id))
        // Skip when touching input for the first time
        if (current.isNew && !current.name && !val) return
        if (current.name && val && current.name === val) return

        const isNew = current.isNew && !!val ? { isNew: false } : {}
        await setTask({ name: val, ...isNew })
      },
    [setTask, task.id],
  )

  return {
    task,
    setTask,
    setTaskPriority,
    deleteTask,
    undeleteTask,
    setTaskName,
  }
}
