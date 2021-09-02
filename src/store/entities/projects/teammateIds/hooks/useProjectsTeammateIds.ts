import { useRecoilValue } from 'recoil'
import { projectsTeammateIdsSelector } from '../atom'

export const useProjectsTeammateIds = (projectId: string) => {
  const teammateIds = useRecoilValue(projectsTeammateIdsSelector(projectId))

  return {
    teammateIds,
  }
}
