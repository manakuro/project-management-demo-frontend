import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { activityState } from '../atom'

export const useActivitiesResponse = () => {
  const setActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.activities.forEach((a) => {
          set(activityState(a.id), a)
        })
      },
    [],
  )

  return {
    setActivities,
  }
}
