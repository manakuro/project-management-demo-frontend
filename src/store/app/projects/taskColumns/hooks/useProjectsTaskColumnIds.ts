import { useRecoilValue } from 'recoil';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { projectsTaskColumnIdsState } from '../atom';

export const useProjectsTaskColumnIds = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(projectsTaskColumnIdsState(projectId));

  return {
    tasksTaskColumnIds: ids,
  };
};
