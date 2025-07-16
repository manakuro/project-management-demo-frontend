import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectIdState } from '../atom';

export const useProjectsProjectId = () => {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const resetProjectId = useResetRecoilState(projectIdState);

  return {
    projectId,
    resetProjectId,
    setProjectId,
  };
};
