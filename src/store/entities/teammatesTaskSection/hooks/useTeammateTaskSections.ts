import { useRecoilValue } from 'recoil'
import { teammatesTaskSectionsState } from '../atom'

export const useTeammateTaskSections = () => {
  const teammateTaskSections = useRecoilValue(teammatesTaskSectionsState)

  return {
    teammateTaskSections,
  }
}
