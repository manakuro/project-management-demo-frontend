import { useRecoilValue } from 'recoil'
import { taskSectionIdByTaskIdState } from '../atom'

export const useTaskSectionIdByTaskId = (taskId: string) => {
  const taskSectionId = useRecoilValue(taskSectionIdByTaskIdState(taskId))

  return {
    taskSectionId,
  }
}
