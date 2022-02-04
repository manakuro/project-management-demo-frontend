import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskIdsByDueDateState } from '../atom'

export const useMyTasksTaskIdsByDueDate = (dueDate: string) => {
  const ids = useRecoilValue(taskIdsByDueDateState({ dueDate }))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
