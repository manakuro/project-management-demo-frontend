import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { taskFileIdsState } from '../atom'

export const useProjectsFiles = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(taskFileIdsState(projectId))
  const taskFileIds = useMemo(() => ids, [ids])

  return {
    taskFileIds,
  }
}
