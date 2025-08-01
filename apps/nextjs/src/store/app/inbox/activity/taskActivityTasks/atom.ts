import { createState } from '@/store/util';
import { atom } from 'jotai';
import type { TaskActivityTask } from './type';

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
} = createState({ initialState });

export const taskIdsByTaskActivityIdState = (taskActivityId: string) =>
  atom((get) => {
    const taskActivityTasks = get(taskActivityTasksState);
    return taskActivityTasks
      .filter((w) => w.taskActivityId === taskActivityId)
      .map((w) => w.taskId);
  });
