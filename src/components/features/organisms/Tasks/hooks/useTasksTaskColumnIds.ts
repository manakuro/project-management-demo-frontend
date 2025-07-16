import { useMyTasksTaskColumnIds } from 'src/store/app/myTasks/taskColumns';
import { useProjectsTaskColumnIds } from 'src/store/app/projects/taskColumns';
import { useTasksContext } from '../TasksProvider';

type Result = {
  tasksTaskColumnIds: string[];
};

export const useTasksTaskColumnIds = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const useMyTasksTaskColumnIdsResult = useMyTasksTaskColumnIds();
  const useProjectsTaskColumnIdsResult = useProjectsTaskColumnIds();

  if (isMyTasksPage) {
    return {
      tasksTaskColumnIds: useMyTasksTaskColumnIdsResult.tasksTaskColumnIds,
    };
  }

  return {
    tasksTaskColumnIds: useProjectsTaskColumnIdsResult.tasksTaskColumnIds,
  };
};
