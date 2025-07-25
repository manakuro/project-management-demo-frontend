import { useAtomValue } from 'jotai';
import { taskIdsByArchivedTaskActivityIdState } from '../atom';

export const useArchivedTaskActivityTasksTaskIds = (
  archivedTaskActivityId: string,
) => {
  const taskIds = useAtomValue(
    taskIdsByArchivedTaskActivityIdState(archivedTaskActivityId),
  );

  return {
    taskIds,
  };
};
