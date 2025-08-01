import { taskFeedIdsByTaskIdState } from '@/store/entities/taskFeed';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const useTaskFeedIdsByTaskId = (taskId: string) => {
  const ids = useAtomValue(
    useMemo(() => taskFeedIdsByTaskIdState(taskId), [taskId]),
  );

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIds,
  };
};
