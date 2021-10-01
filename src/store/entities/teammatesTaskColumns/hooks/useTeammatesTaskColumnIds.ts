import { useRecoilValue } from 'recoil'
import { teammatesTaskColumnIds } from '../atom'

export const useTeammatesTaskColumnIds = () => {
  const ids = useRecoilValue(teammatesTaskColumnIds)

  return {
    teammatesTaskColumnIds: ids,
  }
}
