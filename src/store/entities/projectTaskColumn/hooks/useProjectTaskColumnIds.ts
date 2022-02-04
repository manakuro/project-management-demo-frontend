import { useRecoilValue } from 'recoil'
import { projectTaskColumnIdsState } from '../atom'

export const useProjectTaskColumnIds = () => {
  const ids = useRecoilValue(projectTaskColumnIdsState)

  return {
    projectsTaskColumnIds: ids,
  }
}
