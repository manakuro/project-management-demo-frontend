import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { taskIdsByProjectIdState } from '../atom';

export const useProjectsTaskIdsByProjectId = (projectId: string) => {
  const ids = useRecoilValue(taskIdsByProjectIdState(projectId));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
