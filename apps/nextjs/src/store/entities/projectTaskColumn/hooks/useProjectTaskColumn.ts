import { useAtomValue } from 'jotai';
import { projectTaskColumnState as state } from '../atom';

export const useProjectTaskColumn = (projectTaskColumnId: string) => {
  const projectsTaskColumn = useAtomValue(state(projectTaskColumnId));

  return {
    projectsTaskColumn,
  };
};
