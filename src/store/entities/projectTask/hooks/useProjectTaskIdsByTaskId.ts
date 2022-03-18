import { useRecoilValue } from 'recoil'
import { projectTaskIdsByTaskIdState } from '../atom'

export const useProjectTaskIdsByTaskId = (taskId: string) => {
  const projectTaskIds = useRecoilValue(projectTaskIdsByTaskIdState(taskId))

  return {
    projectTaskIds,
  }
}
