import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { myTaskActivityState } from '../atom'

export const useMyTaskActivitiesResponse = () => {
  const setMyTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.myTaskActivities.forEach((d) => {
          set(myTaskActivityState(d.id), d)
        })
      },
    [],
  )

  return {
    setMyTaskActivities,
  }
}
