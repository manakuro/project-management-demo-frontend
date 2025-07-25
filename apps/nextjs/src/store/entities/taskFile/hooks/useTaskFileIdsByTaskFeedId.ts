import { useAtomValue } from 'jotai';
import { taskFileIdsByFeedIdState } from '../atom';

export const useTaskFileIdsByTaskFeedId = (taskFeedId: string) => {
  const taskFileIds = useAtomValue(taskFileIdsByFeedIdState(taskFeedId));

  return {
    taskFileIds,
  };
};
