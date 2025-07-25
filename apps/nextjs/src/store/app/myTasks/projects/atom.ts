import { atom } from 'jotai';
import { uniq } from 'src/shared/utils';
import { projectTasksState } from 'src/store/entities/projectTask';

export const projectIdsState = atom<string[]>((get) => {
  const projectTasks = get(projectTasksState);
  return uniq(projectTasks.map((p) => p.projectId));
});
