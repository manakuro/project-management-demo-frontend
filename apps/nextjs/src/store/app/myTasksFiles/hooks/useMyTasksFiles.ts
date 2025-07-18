import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useMe } from 'src/store/entities/me';
import { taskFileIdsState } from '../atom';

export const useMyTasksFiles = () => {
  const { me } = useMe();
  const ids = useRecoilValue(taskFileIdsState(me.id));
  const taskFileIds = useMemo(() => ids, [ids]);

  return {
    taskFileIds,
  };
};
