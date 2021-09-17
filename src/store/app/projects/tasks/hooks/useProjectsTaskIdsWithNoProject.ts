import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from '../../project'
import { taskIdsWithNoProjectSelector } from '../atom'

export const useProjectsTaskIdsWithNoProject = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(taskIdsWithNoProjectSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
