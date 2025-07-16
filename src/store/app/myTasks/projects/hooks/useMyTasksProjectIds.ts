import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { projectIdsState } from '../atom';

export const useMyTasksProjectIds = () => {
  const ids = useRecoilValue(projectIdsState);
  const projectIds = useMemo(() => ids, [ids]);

  return {
    projectIds,
  };
};
