import { useAtomValue } from 'jotai';
import { activityState } from '../atom';

export const useActivity = (activityId: string) => {
  const activity = useAtomValue(activityState(activityId));

  return {
    activity,
  };
};
