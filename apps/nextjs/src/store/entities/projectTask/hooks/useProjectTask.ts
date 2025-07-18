import { useRecoilValue } from 'recoil';
import { projectTaskState } from '../atom';

export const useProjectTask = (projectTaskId: string) => {
  const projectTask = useRecoilValue(projectTaskState(projectTaskId));

  return {
    projectTask,
  };
};
