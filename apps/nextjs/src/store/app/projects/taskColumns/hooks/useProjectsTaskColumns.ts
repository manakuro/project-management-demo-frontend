import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import {
  type ProjectTaskColumn,
  useProjectTaskColumn,
  useProjectTaskColumnCommand,
} from 'src/store/entities/projectTaskColumn';
import { projectsTaskColumnIdsState } from '../atom';

export const useProjectsTaskColumns = (tasksTaskColumnId: string) => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(projectsTaskColumnIdsState(projectId));
  const { projectsTaskColumn } = useProjectTaskColumn(tasksTaskColumnId);
  const { setProjectsTaskColumn, setProjectTaskColumnOrder } =
    useProjectTaskColumnCommand();

  const setTasksTaskColumn = useCallback(
    async (input: Partial<ProjectTaskColumn>) => {
      await setProjectsTaskColumn({ id: tasksTaskColumnId, ...input });
    },
    [setProjectsTaskColumn, tasksTaskColumnId],
  );

  const setTaskColumnOrder = useRecoilCallback(
    () => async (startIndex: number, endIndex: number) => {
      const newIds = Array.from(ids);
      const [deleted] = newIds.splice(startIndex, 1);
      newIds.splice(endIndex, 0, deleted);

      setProjectTaskColumnOrder(newIds);
    },
    [ids, setProjectTaskColumnOrder],
  );

  const canMoveLeft = useRecoilCallback(
    () => (id: string) => {
      const currentIndex = ids.indexOf(id);
      return currentIndex > 1;
    },
    [ids],
  );

  const canMoveRight = useRecoilCallback(
    () => (id: string) => {
      const currentIndex = ids.indexOf(id);
      return currentIndex !== ids.length - 1;
    },
    [ids],
  );

  return {
    tasksTaskColumn: projectsTaskColumn,
    setTasksTaskColumn: setTasksTaskColumn,
    setTaskColumnOrder,
    canMoveLeft,
    canMoveRight,
  };
};
