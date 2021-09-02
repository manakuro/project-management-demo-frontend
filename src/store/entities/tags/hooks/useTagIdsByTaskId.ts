import { useRecoilValue } from 'recoil'
import { tagIdsByTaskIdSelector } from '../atom'

export const useTagIdsByTaskId = (taskId: string) => {
  const tagIds = useRecoilValue(tagIdsByTaskIdSelector(taskId))
  return {
    tagIds,
  }
}
