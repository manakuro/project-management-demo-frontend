import { useRecoilValue } from 'recoil';
import { taskIdsByArchivedTaskActivityIdState } from '../atom';

export const useArchivedTaskActivityTasksTaskIds = (
  archivedTaskActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedTaskActivityIdState(archivedTaskActivityId),
  );

  return {
    taskIds,
  };
};
