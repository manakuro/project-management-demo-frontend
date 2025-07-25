import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { projectIdsByTaskIdState } from '../atom';

type Options = {
  excluded?: string[];
};

export const useProjectIdsByTaskId = (
  taskId: string,
  options: Options = {},
) => {
  const ids = useAtomValue(projectIdsByTaskIdState(taskId));
  const projectIds = useMemo(() => {
    if (options?.excluded)
      return ids.filter((id) => !options.excluded?.includes(id));
    return ids;
  }, [ids, options.excluded]);

  return {
    projectIds,
  };
};
