import { useRecoilValue } from 'recoil';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { projectsTaskSectionIdsState } from '../atom';

export const useProjectsTaskSectionIds = () => {
  const { projectId } = useProjectsProjectId();
  const taskSectionIds = useRecoilValue(projectsTaskSectionIdsState(projectId));

  return {
    taskSectionIds,
  };
};
