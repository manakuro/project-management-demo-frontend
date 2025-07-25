import { useAtomValue } from 'jotai';
import { archivedTaskActivityTaskState } from '../atom';

export const useArchivedTaskActivityTask = (
  archivedTaskActivityTaskId: string,
) => {
  const archivedTaskActivityTask = useAtomValue(
    archivedTaskActivityTaskState(archivedTaskActivityTaskId),
  );

  return {
    archivedTaskActivityTask,
  };
};
