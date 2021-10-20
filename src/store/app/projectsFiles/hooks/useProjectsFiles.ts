import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { attachmentIdsState } from '../atom'

export const useProjectsFiles = () => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(attachmentIdsState(projectId))
  const attachmentIds = useMemo(() => ids, [ids])

  return {
    attachmentIds,
  }
}
