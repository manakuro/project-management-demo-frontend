import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskColumnIdsSelector } from '../atom'

export const useMyTasksTaskColumnIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskColumnIdsSelector(me.id))

  return {
    tasksTaskColumnIds: ids,
  }
}
