import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { tasksByTeammateTaskSectionIdState } from 'src/store/entities/teammateTask';

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
