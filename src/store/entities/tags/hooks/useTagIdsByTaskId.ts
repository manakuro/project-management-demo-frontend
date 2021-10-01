import { useRecoilValue } from 'recoil'
import { tagIdsByTaskIdState } from '../atom'

export const useTagIdsByTaskId = (taskId: string) => {
  const tagIds = useRecoilValue(tagIdsByTaskIdState(taskId))
  return {
    tagIds,
  }
}
