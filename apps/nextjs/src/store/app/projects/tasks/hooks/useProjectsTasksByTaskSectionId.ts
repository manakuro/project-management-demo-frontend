import { useAtomValue } from 'jotai';
import { tasksByProjectTaskSectionIdAndProjectIdState } from 'src/store/entities/projectTask';
import { useProjectsProjectId } from '../../project';

export const useProjectsTasksByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId();
  const tasks = useAtomValue(
    tasksByProjectTaskSectionIdAndProjectIdState({
      projectTaskSectionId: taskSectionId,
      projectId,
    }),
  );

  return {
    tasks,
  };
};
