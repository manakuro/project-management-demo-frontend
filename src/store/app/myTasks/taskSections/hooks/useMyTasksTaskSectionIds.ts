import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { myTasksTaskSectionIdsSelector } from '../atom'

export const useMyTasksTaskSectionIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTasksTaskSectionIdsSelector(me.id))
  const taskSectionIds = useMemo(() => ids, [ids])

  return {
    taskSectionIds,
  }
}
