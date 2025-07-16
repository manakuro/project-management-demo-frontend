import { selectorFamily } from 'recoil';
import { createState } from 'src/store/util';
import type { TaskActivityTask } from './type';

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivityTasks/${str}`;

export const initialState = (): TaskActivityTask => ({
  id: '',
  taskActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskActivityTaskState,
  listState: taskActivityTasksState,
  idsState: taskActivityTaskIdsState,
} = createState({ key, initialState });

export const taskIdsByTaskActivityIdState = selectorFamily<string[], string>({
  key: key('taskIdsByTaskActivityIdState'),
  get:
    (taskActivityId: string) =>
    ({ get }) => {
      const taskActivityTasks = get(taskActivityTasksState);
      return taskActivityTasks
        .filter((w) => w.taskActivityId === taskActivityId)
        .map((w) => w.taskId);
    },
});
