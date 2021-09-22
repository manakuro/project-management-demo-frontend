import { useRecoilValue } from 'recoil'
import { teammateIdsByTaskIdSelector } from '../atom'

export const useTeammateIdsByTaskId = (taskId: string) => {
  const teammateIds = useRecoilValue(teammateIdsByTaskIdSelector(taskId))

  return {
    teammateIds,
  }
}
