import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { taskIdsByDueDateState } from '../atom'

export const useMyTasksTaskIdsByDueDate = (dueDate: string) => {
  const { me } = useMe()
  const ids = useRecoilValue(
    taskIdsByDueDateState({ dueDate, teammateId: me.id }),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
