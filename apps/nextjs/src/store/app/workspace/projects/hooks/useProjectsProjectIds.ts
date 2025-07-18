import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { projectsProjectIdsState } from '../atom';

export const useProjectsProjectIds = () => {
  const ids = useRecoilValue(projectsProjectIdsState);
  const projectIds = useMemo(() => ids, [ids]);

  return {
    projectIds,
  };
};
