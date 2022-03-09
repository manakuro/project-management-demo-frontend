import { useRecoilValue } from 'recoil'
import { taskIdsByTaskParentIdState } from 'src/store/entities/teammateTask'

export const useMyTasksSubTaskIds = (taskParentId: string) => {
  const taskIds = useRecoilValue(taskIdsByTaskParentIdState(taskParentId))

  return {
    taskIds,
  }
}
