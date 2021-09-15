import { useRecoilValue } from 'recoil'
import { myTaskActivityTaskSelector } from '../atom'

export const useMyTaskActivityTask = (myTaskActivityTaskId: string) => {
  const myTaskActivityTask = useRecoilValue(
    myTaskActivityTaskSelector(myTaskActivityTaskId),
  )

  return {
    myTaskActivityTask,
  }
}
