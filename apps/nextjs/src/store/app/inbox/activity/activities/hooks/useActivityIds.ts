import { useRecoilValue } from 'recoil';
import { activityIdsState } from '../atom';

export const useActivityIds = () => {
  const activityIds = useRecoilValue(activityIdsState);

  return {
    activityIds,
  };
};
