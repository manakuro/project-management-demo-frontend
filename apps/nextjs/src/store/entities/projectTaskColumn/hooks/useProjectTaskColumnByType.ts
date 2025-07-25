import { useAtomValue } from 'jotai';
import type { TaskColumnTypeValue } from 'src/store/entities/taskColumn';
import { projectsTaskColumnByTypeState } from '../atom';

export const useProjectTaskColumnByType = ({
  type,
  projectId,
}: {
  type: TaskColumnTypeValue;
  projectId: string;
}) => {
  const projectsTaskColumn = useAtomValue(
    projectsTaskColumnByTypeState({ projectId, type }),
  );

  return {
    projectsTaskColumn,
  };
};
