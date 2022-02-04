import { useRecoilValue } from 'recoil'
import { teammateState } from '../atom'

export const useTeammate = (teammateId?: string) => {
  const teammate = useRecoilValue(teammateState(teammateId || ''))

  return {
    teammate,
  }
}
