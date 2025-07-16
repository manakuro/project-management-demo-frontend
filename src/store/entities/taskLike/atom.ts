import { selectorFamily } from 'recoil';
import { createState } from 'src/store/util';
import type { TaskLike } from './type';

const key = (str: string) => `src/store/entities/taskLike/${str}`;

export const initialState = (): TaskLike => ({
  id: '',
  taskId: '',
  teammateId: '',
  workspaceId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskLikeState,
  listState: taskLikesState,
  idsState: taskLikeIdsState,
} = createState({ key, initialState });

export const taskLikesByTaskIdState = selectorFamily<TaskLike[], string>({
  key: key('taskLikesByTaskIdState'),
  get:
    (taskId: string) =>
    ({ get }) => {
      const taskLikes = get(taskLikesState);
      return taskLikes.filter((t) => t.taskId === taskId);
    },
});
