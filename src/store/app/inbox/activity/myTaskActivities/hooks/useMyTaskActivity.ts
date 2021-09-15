import { useRecoilValue } from 'recoil'
import { myTaskActivitySelector } from '../atom'

export const useMyTaskActivity = (myTaskActivityId: string) => {
  const myTaskActivity = useRecoilValue(
    myTaskActivitySelector(myTaskActivityId),
  )

  return {
    myTaskActivity,
  }
}
