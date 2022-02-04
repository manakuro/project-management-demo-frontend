import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskIdsState } from '../atom'

export const useMyTasksTaskIds = () => {
  const ids = useRecoilValue(taskIdsState)
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
