import { useRecoilValue } from 'recoil';
import { projectBaseColorIdsState } from '../atom';

export const useProjectBaseColorIds = () => {
  const projectBaseColorIds = useRecoilValue(projectBaseColorIdsState);

  return {
    projectBaseColorIds,
  };
};
