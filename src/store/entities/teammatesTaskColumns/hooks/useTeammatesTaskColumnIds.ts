import { useRecoilValue } from 'recoil'
import { teammatesTaskColumnIdsState } from '../atom'

export const useTeammatesTaskColumnIds = () => {
  const ids = useRecoilValue(teammatesTaskColumnIdsState)

  return {
    teammatesTaskColumnIds: ids,
  }
}
