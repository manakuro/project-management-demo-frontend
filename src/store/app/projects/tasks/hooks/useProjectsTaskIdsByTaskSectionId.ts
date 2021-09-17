import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from '../../project'
import { taskIdsByTaskSectionIdSelector } from '../atom'

export const useProjectsTaskIdsByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(
    taskIdsByTaskSectionIdSelector({ taskSectionId, projectId }),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
