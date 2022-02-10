import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { projectsTaskSectionIdsState } from '../atom'

export const useProjectsTaskSectionIds = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(projectsTaskSectionIdsState(projectId))
  const taskSectionIds = useMemo(() => ids, [ids])

  return {
    taskSectionIds,
  }
}
