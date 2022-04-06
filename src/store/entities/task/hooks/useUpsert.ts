import { useRecoilCallback } from 'recoil'
import { Task } from 'src/store/entities/task'
import { taskState } from '../atom'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (task: Task) => {
        set(taskState(task.id), (prev) => {
          return {
            ...prev,
            ...task,
          }
        })
      },
    [],
  )

  return {
    upsert,
  }
}
