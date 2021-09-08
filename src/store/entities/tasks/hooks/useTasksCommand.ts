import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { Task } from 'src/store/entities/tasks'
import { taskSelector, defaultTaskState } from '../atom'

export const useTasksCommand = () => {
  const { me } = useMe()
  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskSelector(task.id), task)
      },
    [],
  )

  const setTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskSelector(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  const addTask = useCallback(
    (val?: Partial<Task>) => {
      const id = uuid()
      upsert({
        ...defaultTaskState(),
        ...val,
        isNew: true,
        id,
        createdBy: me.id,
      })

      return id
    },
    [me.id, upsert],
  )

  return {
    addTask,
    setTaskById,
  }
}
