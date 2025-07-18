import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useProjectsProjectId } from '../../project';
import { taskIdsByTaskSectionIdState } from '../atom';

export const useProjectsTaskIdsByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(
    taskIdsByTaskSectionIdState({ taskSectionId, projectId }),
  );
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
