import { useRecoilValue } from 'recoil'
import { activitySelector } from '../atom'

export const useActivity = (activityId: string) => {
  const activity = useRecoilValue(activitySelector(activityId))

  return {
    activity,
  }
}
