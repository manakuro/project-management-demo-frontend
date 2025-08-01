import type { Task } from '@/store/entities/task';
import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import { taskState } from '../atom';

export const useResetTask = () => {
  const resetTask = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(taskState(id), RESET);
    }, []),
  );

  const resetTasks = useAtomCallback(
    useCallback((_, set, tasks: Task[]) => {
      tasks.forEach((t) => {
        set(taskState(t.id), RESET);
      });
    }, []),
  );

  return {
    resetTask,
    resetTasks,
  };
};
