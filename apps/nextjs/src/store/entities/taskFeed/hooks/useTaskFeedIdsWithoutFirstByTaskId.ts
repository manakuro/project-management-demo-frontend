import { taskFeedIdsWithoutFirstState } from '@/store/entities/taskFeed';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const useTaskFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useAtomValue(
    useMemo(() => taskFeedIdsWithoutFirstState(taskId), [taskId]),
  );

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIdsWithoutFirst: taskFeedIds,
  };
};
