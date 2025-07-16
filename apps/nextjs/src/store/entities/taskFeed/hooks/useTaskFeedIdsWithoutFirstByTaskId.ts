import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { taskFeedIdsWithoutFirstState } from 'src/store/entities/taskFeed';

export const useTaskFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useRecoilValue(taskFeedIdsWithoutFirstState(taskId));

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIdsWithoutFirst: taskFeedIds,
  };
};
