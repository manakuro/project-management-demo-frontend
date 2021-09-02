import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsSelector } from '../atom'

export const useTasksDueSoonIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(taskIdsSelector(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
