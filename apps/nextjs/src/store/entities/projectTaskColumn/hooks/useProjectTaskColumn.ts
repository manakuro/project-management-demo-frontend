import { useRecoilValue } from 'recoil';
import { projectTaskColumnState as state } from '../atom';

export const useProjectTaskColumn = (projectTaskColumnId: string) => {
  const projectsTaskColumn = useRecoilValue(state(projectTaskColumnId));

  return {
    projectsTaskColumn,
  };
};
