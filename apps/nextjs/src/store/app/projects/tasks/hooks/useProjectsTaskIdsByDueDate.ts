import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useProjectsProjectId } from '../../project';
import { taskIdsByDueDateState } from '../atom';

export const useProjectsTaskIdsByDueDate = (dueDate: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(taskIdsByDueDateState({ dueDate, projectId }));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
