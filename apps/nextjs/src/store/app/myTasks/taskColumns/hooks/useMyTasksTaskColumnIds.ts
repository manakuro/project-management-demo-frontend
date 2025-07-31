import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMe } from 'src/store/entities/me';
import { taskColumnIdsState } from '../atom';

export const useMyTasksTaskColumnIds = () => {
  const { me } = useMe();
  const ids = useAtomValue(useMemo(() => taskColumnIdsState(me.id), [me.id]));

  return {
    tasksTaskColumnIds: ids,
  };
};
