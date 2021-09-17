import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { useProjectsProjectId } from '../../project'
import { taskIdsByDueDateSelector } from '../atom'

export const useProjectsTaskIdsByDueDate = (dueDate: string) => {
  const { projectId } = useProjectsProjectId()
  const ids = useRecoilValue(taskIdsByDueDateSelector({ dueDate, projectId }))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}
