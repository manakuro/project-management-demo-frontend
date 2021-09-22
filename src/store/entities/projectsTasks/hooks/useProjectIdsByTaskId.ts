import { useRecoilValue } from 'recoil'
import { projectIdsByTaskIdSelector } from '../atom'

export const useProjectIdsByTaskId = (taskId: string) => {
  const projectIds = useRecoilValue(projectIdsByTaskIdSelector(taskId))

  return {
    projectIds,
  }
}
