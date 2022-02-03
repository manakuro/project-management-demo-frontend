import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskState } from '../atom'
import { Task } from '../type'

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskState(taskId || ''))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskState(task.id), task)
      },
    [],
  )
  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(task.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [task.id, upsert],
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

        const isNew = current.isNew && !!val ? { isNew: false } : {}
        await setTask({ name: val, ...isNew })
      },
    [setTask, task.id],
  )

  return {
    task,
    setTask,
    deleteTask,
    undeleteTask,
    setTaskName,
  }
}
