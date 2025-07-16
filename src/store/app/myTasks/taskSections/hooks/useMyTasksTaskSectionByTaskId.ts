import { useRecoilValue } from 'recoil';
import { teammateTaskSectionByTaskIdState } from 'src/store/entities/teammatesTaskSection';

export const useMyTasksTaskSectionByTaskId = (taskId: string) => {
  const taskSection = useRecoilValue(teammateTaskSectionByTaskIdState(taskId));

  return {
    taskSection,
  };
};
