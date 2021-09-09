import { useRecoilValue } from 'recoil'
import { namesByTeammateIdSelector } from '../atom'

export const useTeammateNamesByTeammateIds = (teammateIds: string[]) => {
  const teammateNames = useRecoilValue(namesByTeammateIdSelector(teammateIds))

  return {
    teammateNames,
  }
}
