import { useRecoilValue } from 'recoil'
import { archivedTaskActivityState } from '../atom'

export const useArchivedTaskActivity = (archivedMyTaskActivityId: string) => {
  const archivedTaskActivity = useRecoilValue(
    archivedTaskActivityState(archivedMyTaskActivityId),
  )

  return {
    archivedTaskActivity,
  }
}
