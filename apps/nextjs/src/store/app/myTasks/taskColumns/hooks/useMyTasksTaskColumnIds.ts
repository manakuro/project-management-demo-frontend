import { useRecoilValue } from 'recoil';
import { useMe } from 'src/store/entities/me';
import { taskColumnIdsState } from '../atom';

export const useMyTasksTaskColumnIds = () => {
  const { me } = useMe();
  const ids = useRecoilValue(taskColumnIdsState(me.id));

  return {
    tasksTaskColumnIds: ids,
  };
};
