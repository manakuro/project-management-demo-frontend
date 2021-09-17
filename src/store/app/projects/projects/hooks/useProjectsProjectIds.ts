import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { projectsProjectIdsSelector } from '../atom'

export const useProjectsProjectIds = () => {
  const ids = useRecoilValue(projectsProjectIdsSelector)
  const projectIds = useMemo(() => ids, [ids])

  return {
    projectIds,
  }
}
