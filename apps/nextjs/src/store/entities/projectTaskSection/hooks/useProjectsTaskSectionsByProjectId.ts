import { useAtomValue } from 'jotai';
import { projectTaskSectionsByProjectIdState } from '../atom';

export const useProjectsTaskSectionsByProjectId = (projectId: string) => {
  const projectTaskSections = useAtomValue(
    projectTaskSectionsByProjectIdState(projectId),
  );

  return {
    projectTaskSections,
  };
};
