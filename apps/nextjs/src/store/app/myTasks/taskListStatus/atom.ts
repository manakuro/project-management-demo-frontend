import { atom, selectorFamily } from 'recoil';
import { TaskListCompletedStatusCode } from 'src/store/entities/taskListCompletedStatus';
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus';
import type { TeammateTaskListStatus } from './type';

const key = (str: string) => `src/store/app/myTasks/taskListStatus/${str}`;

export const taskListStatusState = atom<TeammateTaskListStatus>({
  key: key('taskListStatusState'),
  default: {
    id: '',
    taskListCompletedStatusId: '',
    taskListSortStatusId: '',
    taskListCompletedStatus: {
      id: '',
      statusCode: TaskListCompletedStatusCode.Incomplete,
    },
    taskListSortStatus: {
      id: '',
      statusCode: TaskListSortStatusCode.None,
    },
    createdAt: '',
    updatedAt: '',
  },
});

export const isTaskListCompletedStatusState = selectorFamily<
  boolean,
  TaskListCompletedStatuses
>({
  key: key('isTaskListCompletedStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState);
      return (
        taskStatus.taskListCompletedStatus.statusCode ===
        taskListCompletedStatues[key]
      );
    },
});

export const isTaskListSortStatusState = selectorFamily<
  boolean,
  TaskListSortStatuses
>({
  key: key('isTaskListSortStatusState'),
  get:
    (key) =>
    ({ get }) => {
      const taskStatus = get(taskListStatusState);
      return (
        taskStatus.taskListSortStatus.statusCode === taskListSortStatues[key]
      );
    },
});

export const taskListSortStatues = {
  none: TaskListSortStatusCode.None,
  dueDate: TaskListSortStatusCode.DueDate,
  likes: TaskListSortStatusCode.Likes,
  alphabetical: TaskListSortStatusCode.Alphabetical,
  project: TaskListSortStatusCode.Project,
} as const;
export type TaskListSortStatuses = keyof typeof taskListSortStatues;

export const taskListCompletedStatues = {
  incomplete: TaskListCompletedStatusCode.Incomplete,
  completed: TaskListCompletedStatusCode.Completed,
  completedToday: TaskListCompletedStatusCode.CompletedToday,
  completedYesterday: TaskListCompletedStatusCode.CompletedYesterday,
  completed1Week: TaskListCompletedStatusCode.Completed_1Week,
  completed2Weeks: TaskListCompletedStatusCode.Completed_2Weeks,
  completed3Weeks: TaskListCompletedStatusCode.Completed_3Weeks,
  all: TaskListCompletedStatusCode.All,
} as const;
export type TaskListCompletedStatuses = keyof typeof taskListCompletedStatues;
