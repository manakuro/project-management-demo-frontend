import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '../../project';
import { taskIdsByDueDateState } from '../atom';

export const useProjectsTaskIdsByDueDate = (dueDate: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(taskIdsByDueDateState({ dueDate, projectId }));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
