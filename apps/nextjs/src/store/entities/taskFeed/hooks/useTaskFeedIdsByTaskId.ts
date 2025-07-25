import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { taskFeedIdsByTaskIdState } from 'src/store/entities/taskFeed';

export const useTaskFeedIdsByTaskId = (taskId: string) => {
  const ids = useAtomValue(taskFeedIdsByTaskIdState(taskId));

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIds,
  };
};
