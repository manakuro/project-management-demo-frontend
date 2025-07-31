import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTaskState } from '../atom';

export const useProjectTask = (projectTaskId: string) => {
  const projectTask = useAtomValue(
    useMemo(() => projectTaskState(projectTaskId), [projectTaskId]),
  );

  return {
    projectTask,
  };
};
