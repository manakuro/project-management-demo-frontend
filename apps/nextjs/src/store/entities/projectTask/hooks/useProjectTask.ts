import { useAtomValue } from 'jotai';
import { projectTaskState } from '../atom';

export const useProjectTask = (projectTaskId: string) => {
  const projectTask = useAtomValue(projectTaskState(projectTaskId));

  return {
    projectTask,
  };
};
