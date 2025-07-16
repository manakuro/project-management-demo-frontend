import { useRecoilCallback } from 'recoil'
import { taskColumnState } from '../atom'
import type { TaskColumnResponse } from '../type'

export const useTaskColumnsResponse = () => {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: TaskColumnResponse[]) => {
        data.forEach((d) => {
          set(taskColumnState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskColumns,
  }
}
