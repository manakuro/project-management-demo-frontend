import { useRecoilValue } from 'recoil'
import { taskIdsByTaskParentIdState } from 'src/store/entities/projectTask'

export const useProjectSubTaskIds = (taskParentId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdState(taskParentId))

  return {
    taskIds,
  }
}
