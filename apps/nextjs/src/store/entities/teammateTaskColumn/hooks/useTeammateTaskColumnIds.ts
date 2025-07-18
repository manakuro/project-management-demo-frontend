import { useRecoilValue } from 'recoil';
import { teammateTaskColumnIdsState } from '../atom';

export const useTeammateTaskColumnIds = () => {
  const ids = useRecoilValue(teammateTaskColumnIdsState);

  return {
    teammatesTaskColumnIds: ids,
  };
};
