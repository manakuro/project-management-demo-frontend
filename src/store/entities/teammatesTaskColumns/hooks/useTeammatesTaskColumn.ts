import { useRecoilValue } from 'recoil'
import { teammatesTaskColumnState as state } from '../atom'

export const useTeammatesTaskColumn = (teammateTaskColumnId: string) => {
  const teammatesTaskColumn = useRecoilValue(state(teammateTaskColumnId))

  return {
    teammatesTaskColumn,
  }
}
