import { useRecoilValue } from 'recoil'
import { feedPinnedIdsSelector } from '../atom'

export const useFeedsPinnedIds = (taskId: string) => {
  const feedPinnedIds = useRecoilValue(feedPinnedIdsSelector(taskId))

  return {
    feedPinnedIds,
  }
}
