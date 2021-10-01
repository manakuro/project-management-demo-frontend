import { useRecoilValue } from 'recoil'
import { feedPinnedIdsState } from '../atom'

export const useFeedsPinnedIds = (taskId: string) => {
  const feedPinnedIds = useRecoilValue(feedPinnedIdsState(taskId))

  return {
    feedPinnedIds,
  }
}
