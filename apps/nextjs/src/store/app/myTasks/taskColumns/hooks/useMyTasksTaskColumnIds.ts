import { useAtomValue } from 'jotai';
import { useMe } from 'src/store/entities/me';
import { taskColumnIdsState } from '../atom';

export const useMyTasksTaskColumnIds = () => {
  const { me } = useMe();
  const ids = useAtomValue(taskColumnIdsState(me.id));

  return {
    tasksTaskColumnIds: ids,
  };
};
