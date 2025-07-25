import { useAtomValue } from 'jotai';
import { useMe } from 'src/store/entities/me';
import type { TaskColumnTypeValue } from 'src/store/entities/taskColumn';
import { teammatesTaskColumnByTypeState } from '../atom';

export const useTeammateTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { me } = useMe();
  const teammatesTaskColumn = useAtomValue(
    teammatesTaskColumnByTypeState({ teammateId: me.id, type }),
  );

  return {
    teammatesTaskColumn,
  };
};
