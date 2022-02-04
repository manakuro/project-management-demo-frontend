import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { Task } from 'src/store/entities/tasks'
import { taskState, initialState } from '../atom'

export const useTasksCommand = () => {
  const { me } = useMe()
  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskState(task.id), task)
      },
    [],
  )

  const setTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  const addTask = useCallback(
    (val?: Partial<Task> & { taskSectionId: string }) => {
      const id = uuid()
      upsert({
        ...initialState(),
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
