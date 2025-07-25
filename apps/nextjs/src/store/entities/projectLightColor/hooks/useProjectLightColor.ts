import { useAtomValue } from 'jotai';
import { projectLightColorState } from '../atom';

export const useProjectLightColor = (projectLightColorId?: string) => {
  const projectLightColor = useAtomValue(
    projectLightColorState(projectLightColorId || ''),
  );

  return {
    projectLightColor,
  };
};
