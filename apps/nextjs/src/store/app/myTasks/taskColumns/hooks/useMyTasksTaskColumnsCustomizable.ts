import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useMe } from 'src/store/entities/me';
import { useTeammateTaskColumnCommand } from 'src/store/entities/teammateTaskColumn';
import { taskColumnIdsCustomizableState } from '../atom';

export const useMyTasksTaskColumnsCustomizable = () => {
  const { me } = useMe();
  const tasksTaskColumnIds = useAtomValue(
    taskColumnIdsCustomizableState(me.id),
  );
  const { setTeammateTaskColumnOrder } = useTeammateTaskColumnCommand();

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      (_get, _set, updatedIds: string[]) => {
        setTeammateTaskColumnOrder(updatedIds);
      },
      [setTeammateTaskColumnOrder],
    ),
  );

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  };
};
