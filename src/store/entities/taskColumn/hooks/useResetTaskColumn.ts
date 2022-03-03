import { useRecoilCallback } from 'recoil'
import { taskColumnState } from '../atom'

export const useResetTaskColumn = () => {
  const resetTaskColumn = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskColumnState(id))
      },
    [],
  )

  const resetTaskColumns = useRecoilCallback(
    ({ reset }) =>
      (taskColumns: string[]) => {
        taskColumns.forEach((id) => {
          reset(taskColumnState(id))
        })
      },
    [],
  )

  return {
    resetTaskColumn,
    resetTaskColumns,
  }
}
