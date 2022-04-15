import { useRecoilCallback } from 'recoil'
import { activityState } from '../atom'
import { ActivityResponse, Activity } from '../type'

export const useActivitiesResponse = () => {
  const setActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse[]) => {
        data.forEach((a) => {
          set(activityState(a.id), a as Activity)
        })
      },
    [],
  )

  return {
    setActivities,
  }
}
