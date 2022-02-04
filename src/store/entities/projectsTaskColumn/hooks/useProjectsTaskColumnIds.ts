import { useRecoilValue } from 'recoil'
import { projectsTaskColumnIdsState } from '../atom'

export const useProjectsTaskColumnIds = () => {
  const ids = useRecoilValue(projectsTaskColumnIdsState)

  return {
    projectsTaskColumnIds: ids,
  }
}
