import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { projectsTaskColumnIdsSelector } from '../atom'

export const useProjectsTaskColumnIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(projectsTaskColumnIdsSelector(me.id))

  return {
    tasksTaskColumnIds: ids,
  }
}
