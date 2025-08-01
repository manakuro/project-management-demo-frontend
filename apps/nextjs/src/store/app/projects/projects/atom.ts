import { uniq } from '@/shared/utils';
import { projectTasksState } from '@/store/entities/projectTask';
import { atom } from 'jotai';

export const projectsProjectIdsState = atom<string[]>((get) => {
  const projectTasks = get(projectTasksState);
  return uniq(projectTasks.map((p) => p.projectId));
});
