import { useRecoilValue } from 'recoil';
import { createdByIdsByTaskIdsState } from '../atom';

export const useCreatedByIdsByTaskIds = (taskIds: string[]) => {
  const createdByIds = useRecoilValue(createdByIdsByTaskIdsState(taskIds));

  return {
    createdByIds,
  };
};
