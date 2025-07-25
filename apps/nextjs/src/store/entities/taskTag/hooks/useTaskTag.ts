import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskTagState } from '../atom';
import type { TaskTag } from '../type';

export const useTaskTag = (taskTagId?: string) => {
  const taskTag = useAtomValue(taskTagState(taskTagId || ''));

  const setTaskTag = useAtomCallback(
    useCallback(
      (get, set, input: Partial<TaskTag>) => {
        const prev = get(taskTagState(taskTag.id));
        set(taskTagState(taskTag.id), {
          ...prev,
          ...input,
        });
      },
      [taskTag.id],
    ),
  );

  return {
    taskTag,
    setTaskTag,
  };
};
