import { selectorFamily } from 'recoil';
import { createState } from 'src/store/util';
import type { WorkspaceActivityTask } from './type';

const key = (str: string) =>
  `src/store/app/inbox/activity/workspaceActivityTasks/${str}`;

export const initialState = (): WorkspaceActivityTask => ({
  id: '',
  workspaceActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: workspaceActivityTaskState,
  listState: workspaceActivityTasksState,
  idsState: workspaceActivityTaskIdsState,
} = createState({ key, initialState });

export const taskIdsByWorkspaceActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByWorkspaceActivityIdState'),
  get:
    (workspaceActivityId: string) =>
    ({ get }) => {
      const workspaceActivityTasks = get(workspaceActivityTasksState);
      return workspaceActivityTasks
        .filter((w) => w.workspaceActivityId === workspaceActivityId)
        .map((w) => w.taskId);
    },
});
