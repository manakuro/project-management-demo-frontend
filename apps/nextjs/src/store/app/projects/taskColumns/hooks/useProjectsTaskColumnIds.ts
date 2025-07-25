import { useAtomValue } from 'jotai';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { projectsTaskColumnIdsState } from '../atom';

export const useProjectsTaskColumnIds = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(projectsTaskColumnIdsState(projectId));

  return {
    tasksTaskColumnIds: ids,
  };
};
