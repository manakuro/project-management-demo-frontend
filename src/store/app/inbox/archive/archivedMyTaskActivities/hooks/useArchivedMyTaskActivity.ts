import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityState } from '../atom'

export const useArchivedMyTaskActivity = (archivedMyTaskActivityId: string) => {
  const archivedMyTaskActivity = useRecoilValue(
    archivedMyTaskActivityState(archivedMyTaskActivityId),
  )

  return {
    archivedMyTaskActivity,
  }
}
