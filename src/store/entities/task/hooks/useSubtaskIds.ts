import { useRecoilValue } from 'recoil'
import { taskIdsByTaskParentIdState } from '../atom'

export const useSubtaskIds = (taskId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdState(taskId))

  return {
    taskIds,
  }
}
