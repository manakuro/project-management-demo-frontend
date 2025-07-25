import { useAtomValue } from 'jotai';
import { archivedTaskActivityState } from '../atom';

export const useArchivedTaskActivity = (archivedMyTaskActivityId: string) => {
  const archivedTaskActivity = useAtomValue(
    archivedTaskActivityState(archivedMyTaskActivityId),
  );

  return {
    archivedTaskActivity,
  };
};
