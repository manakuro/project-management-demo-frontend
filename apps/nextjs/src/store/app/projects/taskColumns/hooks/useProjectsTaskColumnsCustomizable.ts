import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { useProjectTaskColumnCommand } from 'src/store/entities/projectTaskColumn';
import { projectsTaskColumnIdsCustomizableState } from '../atom';

export const useProjectsTaskColumnsCustomizable = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(
      () => projectsTaskColumnIdsCustomizableState(projectId),
      [projectId],
    ),
  );
  const tasksTaskColumnIds = useMemo(() => ids, [ids]);
  const { setProjectTaskColumnOrder } = useProjectTaskColumnCommand();

  const setTaskColumnOrder = useAtomCallback(
    useCallback(
      (_get, _set, updatedIds: string[]) => {
        setProjectTaskColumnOrder(updatedIds);
      },
      [setProjectTaskColumnOrder],
    ),
  );

  return {
    tasksTaskColumnIds,
    setTaskColumnOrder,
  };
};
