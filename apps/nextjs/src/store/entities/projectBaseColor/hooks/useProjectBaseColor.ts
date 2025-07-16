import { useRecoilValue } from 'recoil';
import { projectBaseColorState } from '../atom';

export const useProjectBaseColor = (projectBaseColorId?: string) => {
  const projectBaseColor = useRecoilValue(
    projectBaseColorState(projectBaseColorId || ''),
  );

  return {
    projectBaseColor,
  };
};
