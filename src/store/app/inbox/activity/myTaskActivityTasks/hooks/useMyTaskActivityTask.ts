import { useRecoilValue } from 'recoil'
import { myTaskActivityTaskState } from '../atom'

export const useMyTaskActivityTask = (myTaskActivityTaskId: string) => {
  const myTaskActivityTask = useRecoilValue(
    myTaskActivityTaskState(myTaskActivityTaskId),
  )

  return {
    myTaskActivityTask,
  }
}
