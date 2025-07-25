import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import { projectState } from '../atom';

export const useResetProject = () => {
  const resetProject = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectState(id), RESET);
    }, []),
  );

  const resetProjects = useAtomCallback(
    useCallback((_, set, projects: string[]) => {
      projects.forEach((id) => {
        set(projectState(id), RESET);
      });
    }, []),
  );

  return {
    resetProject,
    resetProjects,
  };
};
