import { useRecoilValue } from 'recoil'
import { projectIdsByTaskIdState } from '../atom'

export const useProjectIdsByTaskId = (taskId: string) => {
  const projectIds = useRecoilValue(projectIdsByTaskIdState(taskId))

  return {
    projectIds,
  }
}
