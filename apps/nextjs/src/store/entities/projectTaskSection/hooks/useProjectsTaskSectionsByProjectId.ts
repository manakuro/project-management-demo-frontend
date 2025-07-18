import { useRecoilValue } from 'recoil';
import { projectTaskSectionsByProjectIdState } from '../atom';

export const useProjectsTaskSectionsByProjectId = (projectId: string) => {
  const projectTaskSections = useRecoilValue(
    projectTaskSectionsByProjectIdState(projectId),
  );

  return {
    projectTaskSections,
  };
};
