import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from '../../project'
import { taskIdsSelector } from '../atom'

export const useProjectsTaskIds = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(taskIdsSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
