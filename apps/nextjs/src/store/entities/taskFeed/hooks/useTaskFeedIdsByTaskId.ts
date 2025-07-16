import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { taskFeedIdsByTaskIdState } from 'src/store/entities/taskFeed';

export const useTaskFeedIdsByTaskId = (taskId: string) => {
  const ids = useRecoilValue(taskFeedIdsByTaskIdState(taskId));

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIds,
  };
};
