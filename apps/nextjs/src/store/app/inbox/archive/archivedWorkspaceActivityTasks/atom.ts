import { selectorFamily } from 'recoil';
import { createState } from 'src/store/util';
import type { ArchivedWorkspaceActivityTask } from './type';

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedWorkspaceActivityTasks/${str}`;

export const initialState = (): ArchivedWorkspaceActivityTask => ({
  id: '',
  archivedWorkspaceActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: archivedWorkspaceActivityTaskState,
  listState: archivedWorkspaceActivityTasksState,
  idsState: archivedWorkspaceActivityTaskIdsState,
} = createState({ key, initialState });

export const taskIdsByArchivedWorkspaceActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByArchivedWorkspaceActivityIdState'),
  get:
    (archivedWorkspaceActivityId: string) =>
    ({ get }) => {
      const archivedWorkspaceActivityTasks = get(
        archivedWorkspaceActivityTasksState,
      );
      return archivedWorkspaceActivityTasks
        .filter(
          (w) => w.archivedWorkspaceActivityId === archivedWorkspaceActivityId,
        )
        .map((w) => w.taskId);
    },
});
