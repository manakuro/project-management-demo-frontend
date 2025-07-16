import { useMemo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { useProjectTaskColumnCommand } from 'src/store/entities/projectTaskColumn';
import { projectsTaskColumnIdsCustomizableState } from '../atom';

export const useProjectsTaskColumnsCustomizable = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useRecoilValue(projectsTaskColumnIdsCustomizableState(projectId));
  const tasksTaskColumnIds = useMemo(() => ids, [ids]);
  const { setProjectTaskColumnOrder } = useProjectTaskColumnCommand();

  const setTaskColumnOrder = useRecoilCallback(
    () => (updatedIds: string[]) => {
      setProjectTaskColumnOrder(updatedIds);
    },
    [setProjectTaskColumnOrder],
  );

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  };
};
