import { useRecoilValue } from 'recoil';
import { teammateTaskColumnState as state } from '../atom';

export const useTeammateTaskColumn = (teammateTaskColumnId: string) => {
  const teammatesTaskColumn = useRecoilValue(state(teammateTaskColumnId));

  return {
    teammatesTaskColumn,
  };
};
