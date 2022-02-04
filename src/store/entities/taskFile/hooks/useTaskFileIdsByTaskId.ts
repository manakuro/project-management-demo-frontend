import { useRecoilValue } from 'recoil'
import { taskFileIdsByTaskIdState } from '../atom'

export const useTaskFileIdsByTaskId = (taskId: string) => {
  const taskFileIds = useRecoilValue(taskFileIdsByTaskIdState(taskId))

  return {
    taskFileIds,
  }
}
