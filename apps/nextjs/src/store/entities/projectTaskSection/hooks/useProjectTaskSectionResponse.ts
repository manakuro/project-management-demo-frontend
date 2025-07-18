import { useRecoilCallback } from 'recoil';
import type { ProjectTaskResponse } from 'src/graphql/types/projectTask';
import { uniqBy } from 'src/shared/utils';
import { useProjectTaskResponse } from 'src/store/entities/projectTask';
import { projectTaskSectionState } from '../atom';
import type { ProjectTaskSectionResponse } from '../type';

type Data = Override<Partial<ProjectTaskSectionResponse>, { id: string }>;

export const useProjectTaskSectionResponse = () => {
  const { setProjectTask } = useProjectTaskResponse();

  const setProjectsTaskSections = useRecoilCallback(
    ({ set }) =>
      (
        data: Data[],
        options?: { includeProjectTasks?: boolean; includeTask?: boolean },
      ) => {
        const includeProjectTasks = options?.includeProjectTasks ?? true;
        const includeTask = options?.includeTask ?? true;

        data.forEach((d) => {
          set(projectTaskSectionState(d.id), (prev) => {
            return {
              ...prev,
              ...d,
            };
          });
        });
        if (!includeProjectTasks) return;

        const projectTasks = data.reduce<ProjectTaskResponse[]>((acc, p) => {
          acc.push(...(p?.projectTasks || []));
          return acc;
        }, []);
        setProjectTask(uniqBy(projectTasks, 'id'), { includeTask });
      },
    [setProjectTask],
  );

  return {
    setProjectsTaskSections,
  };
};
