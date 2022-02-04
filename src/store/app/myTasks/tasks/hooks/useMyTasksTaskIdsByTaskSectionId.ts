import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskIdsByTaskSectionIdState } from '../atom'

export const useMyTasksTaskIdsByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const ids = useRecoilValue(
    taskIdsByTaskSectionIdState({ teammateTaskSectionId }),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
