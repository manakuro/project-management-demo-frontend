import { tasksByTeammateTaskSectionIdState } from '@/store/entities/teammateTask';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const useMyTasksTasksByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const tasks = useAtomValue(
    useMemo(
      () => tasksByTeammateTaskSectionIdState(teammateTaskSectionId),
      [teammateTaskSectionId],
    ),
  );

  return {
    tasks,
  };
};
