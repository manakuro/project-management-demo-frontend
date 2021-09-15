import { useRecoilCallback } from 'recoil'
import { ActivityResponse } from '../../type'
import { myTaskActivitySelector } from '../atom'

export const useMyTaskActivitiesResponse = () => {
  const setMyTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ActivityResponse) => {
        data.myTaskActivities.forEach((d) => {
          set(myTaskActivitySelector(d.id), d)
        })
      },
    [],
  )

  return {
    setMyTaskActivities,
  }
}
