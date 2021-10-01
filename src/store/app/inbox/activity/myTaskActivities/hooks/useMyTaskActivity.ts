import { useRecoilValue } from 'recoil'
import { myTaskActivityState } from '../atom'

export const useMyTaskActivity = (myTaskActivityId: string) => {
  const myTaskActivity = useRecoilValue(myTaskActivityState(myTaskActivityId))

  return {
    myTaskActivity,
  }
}
