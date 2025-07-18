import { useRecoilCallback } from 'recoil';
import { useTaskColumnsResponse } from 'src/store/entities/taskColumn';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumnResponse } from '../type';

export const useProjectTaskColumnResponse = () => {
  const { setTaskColumns } = useTaskColumnsResponse();

  const setProjectsTaskColumns = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTaskColumnResponse[]) => {
        data.forEach((p) => {
          set(projectTaskColumnState(p.id), p);
        });
        const taskColumns = data.map((d) => d.taskColumn);
        setTaskColumns(taskColumns);
      },
    [setTaskColumns],
  );

  return {
    setProjectsTaskColumns,
  };
};
