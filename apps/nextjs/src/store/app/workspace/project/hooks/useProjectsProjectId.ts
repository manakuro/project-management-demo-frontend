import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { projectIdState } from '../atom';

export const useProjectsProjectId = () => {
  const [projectId, setProjectId] = useAtom(projectIdState);
  const resetProjectId = () => setProjectId(RESET);

  return {
    projectId,
    resetProjectId,
    setProjectId,
  };
};
