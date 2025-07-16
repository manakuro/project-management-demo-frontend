import { useRecoilValue } from 'recoil';
import { tasksByTeammateTaskSectionIdState } from 'src/store/entities/teammateTask';

export const useMyTasksTasksByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const tasks = useRecoilValue(
    tasksByTeammateTaskSectionIdState(teammateTaskSectionId),
  );

  return {
    tasks,
  };
};
