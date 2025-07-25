import { useAtomValue } from 'jotai';
import { taskFeedPinnedIdsState } from '../atom';

export const useTaskFeedsPinnedIds = (taskId: string) => {
  const taskFeedPinnedIds = useAtomValue(taskFeedPinnedIdsState(taskId));

  return {
    taskFeedPinnedIds,
  };
};
