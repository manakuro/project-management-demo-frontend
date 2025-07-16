import { useRecoilCallback } from 'recoil';
import { getNodesFromEdges } from 'src/shared/apollo/util';
import {
  type TeammateTaskColumnResponse,
  useTeammateTaskColumnResponse,
} from 'src/store/entities/teammateTaskColumn';
import {
  type TeammateTaskSectionResponse,
  useTeammatesTaskSectionResponse,
} from 'src/store/entities/teammatesTaskSection';
import { taskListStatusState } from '../taskListStatus';
import type {
  MyTasksResponse,
  MyTasksTeammateTaskSectionResponse,
} from '../type';

export const useMyTasksResponse = () => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();
  const { setTaskColumns, setTaskStatus } = useSetters();
  const setMyTasks = useRecoilCallback(
    () => (data: MyTasksResponse) => {
      const teammateTaskSections = getNodesFromEdges<
        MyTasksTeammateTaskSectionResponse,
        MyTasksResponse['teammateTaskSections']
      >(data.teammateTaskSections);

      setTeammatesTaskSections(
        teammateTaskSections as TeammateTaskSectionResponse[],
      );
      setTaskColumns(data);
      setTaskStatus(data);
    },
    [setTaskColumns, setTeammatesTaskSections, setTaskStatus],
  );

  return {
    setMyTasks,
  };
};

const useSetters = () => {
  const { setTeammatesTaskColumns } = useTeammateTaskColumnResponse();

  const setTaskColumns = useRecoilCallback(
    () => (data: MyTasksResponse) => {
      const teammateTaskSections = getNodesFromEdges<
        TeammateTaskColumnResponse,
        MyTasksResponse['teammateTaskColumns']
      >(data.teammateTaskColumns);

      setTeammatesTaskColumns(teammateTaskSections);
    },
    [setTeammatesTaskColumns],
  );

  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (data: MyTasksResponse) => {
        if (data.teammateTaskListStatus) {
          set(taskListStatusState, data.teammateTaskListStatus);
        }
      },
    [],
  );

  return {
    setTaskColumns,
    setTaskStatus,
  };
};
