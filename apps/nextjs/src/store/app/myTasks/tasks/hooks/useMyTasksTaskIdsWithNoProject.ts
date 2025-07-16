import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { taskIdsWithNoProjectState } from '../atom';

export const useMyTasksTaskIdsWithNoProject = () => {
  const ids = useRecoilValue(taskIdsWithNoProjectState);
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
