import { useRecoilValue } from 'recoil';
import { projectLightColorIdsState } from '../atom';

export const useProjectLightColorIds = () => {
  const projectLightColorIds = useRecoilValue(projectLightColorIdsState);

  return {
    projectLightColorIds,
  };
};
