import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { projectsTaskColumnIdsState } from '../atom'

export const useProjectsTaskColumnIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsState(me.id))

  return {
    tasksTaskColumnIds: ids,
  }
}
