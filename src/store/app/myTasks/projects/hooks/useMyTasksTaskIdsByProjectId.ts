import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { myTasksProjectTaskIdsSelector } from '../atom'

export const useMyTasksTaskIdsByProjectId = (projectId: string) => {
  const ids = useRecoilValue(myTasksProjectTaskIdsSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
