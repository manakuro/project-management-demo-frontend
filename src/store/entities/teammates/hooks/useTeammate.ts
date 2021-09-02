import { useRecoilValue } from 'recoil'
import { teammateSelector } from '../atom'

export const useTeammate = (teammateId?: string) => {
  const teammate = useRecoilValue(teammateSelector(teammateId || ''))

  return {
    teammate,
  }
}
