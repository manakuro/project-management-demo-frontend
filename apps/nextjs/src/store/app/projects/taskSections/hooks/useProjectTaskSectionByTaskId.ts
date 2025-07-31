import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { projectTaskSectionByTaskIdAndProjectIdState } from 'src/store/entities/projectTaskSection';

export const useProjectTaskSectionByTaskId = (taskId: string) => {
  const { projectId } = useProjectsProjectId();
  const taskSection = useAtomValue(
    useMemo(
      () => projectTaskSectionByTaskIdAndProjectIdState({ taskId, projectId }),
      [taskId, projectId],
    ),
  );

  return {
    taskSection,
  };
};
