import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from 'src/store/entities/me';
import { taskFileIdsState } from '../atom';

export const useMyTasksFiles = () => {
  const { me } = useMe();
  const ids = useAtomValue(taskFileIdsState(me.id));
  const taskFileIds = useMemo(() => ids, [ids]);

  return {
    taskFileIds,
  };
};
