import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivitySelector } from '../atom'

export const useArchivedMyTaskActivity = (archivedMyTaskActivityId: string) => {
  const archivedMyTaskActivity = useRecoilValue(
    archivedMyTaskActivitySelector(archivedMyTaskActivityId),
  )

  return {
    archivedMyTaskActivity,
  }
}
