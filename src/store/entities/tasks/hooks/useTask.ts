import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskSelector } from '../atom'
import { Task } from '../type'

export const useTask = (taskId?: string) => {
  const task = useRecoilValue(taskSelector(taskId || ''))

  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskSelector(task.id), task)
      },
    [],
  )
  const setTask = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskSelector(task.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [task.id, upsert],
  )
  const deleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: true })
    },
    [setTask],
  )
  const undeleteTask = useRecoilCallback(
    () => async () => {
      await setTask({ isDeleted: false })
    },
    [setTask],
  )

  const setTaskName = useRecoilCallback(
    ({ snapshot }) =>
      async (val: string) => {
        const current = await snapshot.getPromise(taskSelector(task.id))
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
