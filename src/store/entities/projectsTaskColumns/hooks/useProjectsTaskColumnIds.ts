import { useRecoilValue } from 'recoil'
import { projectsTaskColumnIds } from '../atom'

export const useProjectsTaskColumnIds = () => {
  const ids = useRecoilValue(projectsTaskColumnIds)

  return {
    projectsTaskColumnIds: ids,
  }
}
