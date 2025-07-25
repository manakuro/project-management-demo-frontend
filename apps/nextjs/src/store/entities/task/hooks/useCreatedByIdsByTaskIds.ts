import { useAtomValue } from 'jotai';
import { createdByIdsByTaskIdsState } from '../atom';

export const useCreatedByIdsByTaskIds = (taskIds: string[]) => {
  const createdByIds = useAtomValue(createdByIdsByTaskIdsState(taskIds));

  return {
    createdByIds,
  };
};
