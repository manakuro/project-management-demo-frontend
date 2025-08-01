import { teammateTaskSectionByTaskIdState } from '@/store/entities/teammatesTaskSection';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const useMyTasksTaskSectionByTaskId = (taskId: string) => {
  const taskSection = useAtomValue(
    useMemo(() => teammateTaskSectionByTaskIdState(taskId), [taskId]),
  );

  return {
    taskSection,
  };
};
