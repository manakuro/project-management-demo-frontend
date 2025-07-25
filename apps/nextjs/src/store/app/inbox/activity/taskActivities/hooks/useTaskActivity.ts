import { useAtomValue } from 'jotai';
import { taskActivityState } from '../atom';

export const useTaskActivity = (myTaskActivityId: string) => {
  const taskActivity = useAtomValue(taskActivityState(myTaskActivityId));

  return {
    taskActivity,
  };
};
