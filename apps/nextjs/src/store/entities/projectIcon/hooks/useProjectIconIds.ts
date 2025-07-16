import { useRecoilValue } from 'recoil';
import { projectIconIdsState } from '../atom';

export const useProjectIconIds = () => {
  const projectIconIds = useRecoilValue(projectIconIdsState);

  return {
    projectIconIds,
  };
};
