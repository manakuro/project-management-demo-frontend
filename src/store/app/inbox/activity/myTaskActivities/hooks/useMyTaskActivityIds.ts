import { useRecoilValue } from 'recoil'
import { myTaskActivityIdsState } from '../atom'

export const useMyTaskActivityIds = () => {
  const myTaskActivityIds = useRecoilValue(myTaskActivityIdsState)

  return {
    myTaskActivityIds,
  }
}
