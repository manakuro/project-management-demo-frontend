import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { myTasksProjectIdsSelector } from '../atom'

export const useMyTasksProjectIds = () => {
  const ids = useRecoilValue(myTasksProjectIdsSelector)
  const projectIds = useMemo(() => ids, [ids])

  return {
    projectIds,
  }
}
