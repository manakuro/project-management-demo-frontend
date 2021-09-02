import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsByTaskSectionIdSelector } from '../atom'

export const useMyTasksTaskIdsByTaskSectionId = (taskSectionId: string) => {
  const { me } = useMe()
  const ids = useRecoilValue(
    taskIdsByTaskSectionIdSelector({ taskSectionId, teammateId: me.id }),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
