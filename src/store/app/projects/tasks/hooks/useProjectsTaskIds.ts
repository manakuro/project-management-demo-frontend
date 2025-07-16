import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useProjectsProjectId } from '../../project';
import { taskIdsState } from '../atom';

export const useProjectsTaskIds = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(taskIdsState(projectId));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
