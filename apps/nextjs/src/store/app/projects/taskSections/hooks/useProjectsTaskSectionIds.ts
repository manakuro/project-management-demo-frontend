import { useAtomValue } from 'jotai';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { projectsTaskSectionIdsState } from '../atom';

export const useProjectsTaskSectionIds = () => {
  const { projectId } = useProjectsProjectId();
  const taskSectionIds = useAtomValue(projectsTaskSectionIdsState(projectId));

  return {
    taskSectionIds,
  };
};
