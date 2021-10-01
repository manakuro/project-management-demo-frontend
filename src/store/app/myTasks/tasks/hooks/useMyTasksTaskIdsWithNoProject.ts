import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsWithNoProjectState } from '../atom'

export const useMyTasksTaskIdsWithNoProject = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskIdsWithNoProjectState(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
