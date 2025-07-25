import { useAtomValue } from 'jotai';
import { projectTaskSectionByTaskIdAndProjectIdState } from '../atom';

export const useProjectTaskSectionByTaskIdAndProjectId = (props: {
  taskId: string;
  projectId: string;
}) => {
  const projectTaskSection = useAtomValue(
    projectTaskSectionByTaskIdAndProjectIdState(props),
  );

  return {
    projectTaskSection,
  };
};
