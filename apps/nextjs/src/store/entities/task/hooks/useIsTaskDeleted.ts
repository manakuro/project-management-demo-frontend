import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { deletedTasksByTaskIdState } from 'src/store/entities/deletedTask';

export const useIsTaskDeleted = (taskId: string) => {
  const deletedTasks = useAtomValue(deletedTasksByTaskIdState(taskId));
  const isTaskDeleted = useMemo(
    () => !!deletedTasks.length,
    [deletedTasks.length],
  );

  return {
    isTaskDeleted,
  };
};
