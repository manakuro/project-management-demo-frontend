import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { taskFeedIdsWithoutFirstState } from 'src/store/entities/taskFeed';

export const useTaskFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useAtomValue(taskFeedIdsWithoutFirstState(taskId));

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIdsWithoutFirst: taskFeedIds,
  };
};
