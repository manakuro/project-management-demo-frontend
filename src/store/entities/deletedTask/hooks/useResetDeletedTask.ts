import { useRecoilCallback } from 'recoil'
import { deletedTaskState } from '../atom'

export const useResetDeletedTask = () => {
  const resetDeletedTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(deletedTaskState(id))
      },
    [],
  )

  const resetDeletedTasks = useRecoilCallback(
    ({ reset }) =>
      (deletedTasks: string[]) => {
        deletedTasks.forEach((id) => {
          reset(deletedTaskState(id))
        })
      },
    [],
  )

  return {
    resetDeletedTask,
    resetDeletedTasks,
  }
}
