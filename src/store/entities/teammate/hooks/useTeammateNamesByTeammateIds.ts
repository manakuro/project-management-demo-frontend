import { useRecoilValue } from 'recoil'
import { namesByTeammateIdState } from '../atom'

export const useTeammateNamesByTeammateIds = (teammateIds: string[]) => {
  const teammateNames = useRecoilValue(namesByTeammateIdState(teammateIds))

  return {
    teammateNames,
  }
}
