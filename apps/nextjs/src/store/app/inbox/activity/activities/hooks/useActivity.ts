import { useRecoilValue } from 'recoil';
import { activityState } from '../atom';

export const useActivity = (activityId: string) => {
  const activity = useRecoilValue(activityState(activityId));

  return {
    activity,
  };
};
