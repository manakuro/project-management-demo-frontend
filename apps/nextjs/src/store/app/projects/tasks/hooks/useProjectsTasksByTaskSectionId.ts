import { useRecoilValue } from 'recoil';
import { tasksByProjectTaskSectionIdAndProjectIdState } from 'src/store/entities/projectTask';
import { useProjectsProjectId } from '../../project';

export const useProjectsTasksByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId();
  const tasks = useRecoilValue(
    tasksByProjectTaskSectionIdAndProjectIdState({
      projectTaskSectionId: taskSectionId,
      projectId,
    }),
  );

  return {
    tasks,
  };
};
