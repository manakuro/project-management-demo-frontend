import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByDueDateState } from '../atom';

export const useMyTasksTaskIdsByDueDate = (dueDate: string) => {
  const ids = useAtomValue(taskIdsByDueDateState({ dueDate }));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
