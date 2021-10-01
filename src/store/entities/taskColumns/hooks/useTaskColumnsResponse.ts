import { useRecoilCallback } from 'recoil'
import { taskColumnSelector } from '../atom'
import { TaskColumnResponse } from '../type'

export const useTaskColumnsResponse = () => {
  const setTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: TaskColumnResponse[]) => {
        data.forEach((d) => {
          set(taskColumnSelector(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskColumns,
  }
}
