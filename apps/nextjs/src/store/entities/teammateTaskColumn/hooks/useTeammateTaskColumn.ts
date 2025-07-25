import { useAtomValue } from 'jotai';
import { teammateTaskColumnState as state } from '../atom';

export const useTeammateTaskColumn = (teammateTaskColumnId: string) => {
  const teammatesTaskColumn = useAtomValue(state(teammateTaskColumnId));

  return {
    teammatesTaskColumn,
  };
};
