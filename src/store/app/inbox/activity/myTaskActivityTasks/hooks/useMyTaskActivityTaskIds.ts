import { useRecoilValue } from 'recoil'
import { myTaskActivityTaskIdsState } from '../atom'

export const useMyTaskActivityTaskIds = () => {
  const myTaskActivityTaskIds = useRecoilValue(myTaskActivityTaskIdsState)

  return {
    myTaskActivityTaskIds,
  }
}
