import { useAtomValue } from 'jotai';
import { teammateIdsByTaskIdState } from '../atom';

export const useTeammateIdsByTaskId = (taskId: string) => {
  const teammateIds = useAtomValue(teammateIdsByTaskIdState(taskId));

  return {
    teammateIds,
  };
};
