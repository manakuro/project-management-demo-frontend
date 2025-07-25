import { useAtomValue } from 'jotai';
import { projectBaseColorState } from '../atom';

export const useProjectBaseColor = (projectBaseColorId?: string) => {
  const projectBaseColor = useAtomValue(
    projectBaseColorState(projectBaseColorId || ''),
  );

  return {
    projectBaseColor,
  };
};
