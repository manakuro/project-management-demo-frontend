import { createState } from '@/store/util';
import { atom } from 'jotai';
import type { DeletedTask } from './type';

export const initialState = (): DeletedTask => ({
  id: '',
  taskId: '',
  workspaceId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: deletedTaskState,
  listState: deletedTasksState,
  idsState: deletedTaskIdsState,
} = createState({ initialState });

export const deletedTasksByTaskIdState = (taskId: string) =>
  atom<DeletedTask[]>((get) => {
    const deletedTasks = get(deletedTasksState);
    return deletedTasks.filter((t) => t.taskId === taskId);
  });
