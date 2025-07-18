import type { TaskColumnTypeValue } from 'src/store/entities/taskColumn';
import { useTeammateTaskColumnByType } from 'src/store/entities/teammateTaskColumn';

export const useMyTasksTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { teammatesTaskColumn } = useTeammateTaskColumnByType(type);

  return {
    tasksTaskColumn: teammatesTaskColumn,
  };
};
