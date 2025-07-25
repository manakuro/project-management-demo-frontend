import { useAtomValue } from 'jotai';
import { projectTaskIdsByTaskIdState } from '../atom';

export const useProjectTaskIdsByTaskId = (taskId: string) => {
  const projectTaskIds = useAtomValue(projectTaskIdsByTaskIdState(taskId));

  return {
    projectTaskIds,
  };
};
