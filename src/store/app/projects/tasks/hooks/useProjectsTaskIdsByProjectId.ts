import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskIdsByProjectIdSelector } from '../atom'

export const useProjectsTaskIdsByProjectId = (projectId: string) => {
  const ids = useRecoilValue(taskIdsByProjectIdSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
