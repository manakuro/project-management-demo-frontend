import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '../../project';
import { taskIdsState } from '../atom';

export const useProjectsTaskIds = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(taskIdsState(projectId));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
