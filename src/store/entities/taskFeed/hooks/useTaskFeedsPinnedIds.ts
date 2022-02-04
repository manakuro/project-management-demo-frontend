import { useRecoilValue } from 'recoil'
import { taskFeedPinnedIdsState } from '../atom'

export const useTaskFeedsPinnedIds = (taskId: string) => {
  const taskFeedPinnedIds = useRecoilValue(taskFeedPinnedIdsState(taskId))

  return {
    taskFeedPinnedIds,
  }
}
