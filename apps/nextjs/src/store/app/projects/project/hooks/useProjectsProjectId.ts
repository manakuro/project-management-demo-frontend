import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { projectIdState } from '../atom';

export const useProjectsProjectId = () => {
  const [projectId, setProjectId] = useAtom(projectIdState);
  const resetProjectId = useCallback(() => setProjectId(''), [setProjectId]);

  return {
    projectId,
    resetProjectId,
    setProjectId,
  };
};
