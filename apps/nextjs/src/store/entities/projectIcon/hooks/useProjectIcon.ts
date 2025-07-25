import { useAtomValue } from 'jotai';
import { projectIconState } from '../atom';

export const useProjectIcon = (projectIconId?: string) => {
  const projectIcon = useAtomValue(projectIconState(projectIconId || ''));

  return {
    projectIcon,
  };
};
