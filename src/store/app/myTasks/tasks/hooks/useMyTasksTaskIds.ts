import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsState } from '../atom'

export const useMyTasksTaskIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskIdsState(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
