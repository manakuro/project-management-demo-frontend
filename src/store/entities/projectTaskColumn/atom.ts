import { selectorFamily } from 'recoil';
import { taskColumnByTypeState } from 'src/store/entities/taskColumn';
import type { TaskColumnTypeValue } from 'src/store/entities/taskColumn';
import { createState } from 'src/store/util';
import type { ProjectTaskColumn } from './type';

const key = (str: string) => `src/store/entities/projectTaskColumn/${str}`;

export const initialState = (): ProjectTaskColumn => ({
  id: '',
  taskColumnId: '',
  projectId: '',
  width: '',
  disabled: false,
  customizable: false,
  order: 0,
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectTaskColumnState,
  listState: projectTaskColumnsState,
  idsState: projectTaskColumnIdsState,
} = createState({ key, initialState });

export const projectsTaskColumnsByProjectIdState = selectorFamily<
  ProjectTaskColumn[],
  string
>({
  key: key('projectsTaskColumnsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskColumns = get(projectTaskColumnsState);
      return taskColumns.filter((t) => t.projectId === projectId);
    },
});

export const projectsTaskColumnByTypeState = selectorFamily<
  ProjectTaskColumn,
  { projectId: string; type: TaskColumnTypeValue }
>({
  key: key('projectsTaskColumnByTypeState'),
  get:
    ({ projectId, type }) =>
    ({ get }) => {
      const taskColumn = get(taskColumnByTypeState(type));
      const taskColumns = get(projectTaskColumnsState);
      return (
        taskColumns.find(
          (t) => t.projectId === projectId && t.taskColumnId === taskColumn.id,
        ) ?? initialState()
      );
    },
});
