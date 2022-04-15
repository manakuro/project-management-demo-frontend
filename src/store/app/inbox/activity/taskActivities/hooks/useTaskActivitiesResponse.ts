import { useRecoilCallback } from 'recoil'
import { taskActivityState } from '../atom'
import { TaskActivityResponse } from '../type'

export const useTaskActivitiesResponse = () => {
  const setTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: TaskActivityResponse[]) => {
        data.forEach((d) => {
          set(taskActivityState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskActivities,
  }
}
