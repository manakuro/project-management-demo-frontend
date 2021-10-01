import { useRecoilValue } from 'recoil'
import { teammateIdsByTaskIdState } from '../atom'

export const useTeammateIdsByTaskId = (taskId: string) => {
  const teammateIds = useRecoilValue(teammateIdsByTaskIdState(taskId))

  return {
    teammateIds,
  }
}
