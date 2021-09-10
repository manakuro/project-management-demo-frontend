import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { taskActivitySelector } from '../atom'

export const useTaskActivitiesResponse = () => {
  const setTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.taskActivities.forEach((d) => {
          set(taskActivitySelector(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskActivities,
  }
}
