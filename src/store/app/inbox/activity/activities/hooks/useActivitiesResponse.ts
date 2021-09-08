import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { activitySelector } from '../atom'

export const useActivitiesResponse = () => {
  const setActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.activities.forEach((a) => {
          set(activitySelector(a.id), a)
        })
      },
    [],
  )

  return {
    setActivities,
  }
}
