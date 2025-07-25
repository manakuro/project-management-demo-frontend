import { atom } from 'jotai';
import {
  filterByDueDateInFiveDays,
  sortByDueDate,
} from 'src/store/entities/task';
import { tasksByTeammateIdState } from 'src/store/entities/teammateTask';

export const taskIdsState = atom<string[]>((get) => {
  let tasks = get(tasksByTeammateIdState);
  tasks = filterByDueDateInFiveDays(tasks);
  tasks = sortByDueDate(tasks);

  return tasks.map((t) => t.id);
});
