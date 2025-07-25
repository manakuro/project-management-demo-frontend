import { useAtomValue } from 'jotai';
import { tasksByTeammateTaskSectionIdState } from 'src/store/entities/teammateTask';

export const useMyTasksTasksByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const tasks = useAtomValue(
    tasksByTeammateTaskSectionIdState(teammateTaskSectionId),
  );

  return {
    tasks,
  };
};
