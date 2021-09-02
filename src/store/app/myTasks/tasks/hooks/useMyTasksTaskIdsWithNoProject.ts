import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsWithNoProjectSelector } from '../atom'

export const useMyTasksTaskIdsWithNoProject = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskIdsWithNoProjectSelector(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
