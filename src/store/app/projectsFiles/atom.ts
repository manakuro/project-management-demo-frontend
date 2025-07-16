import { selectorFamily } from 'recoil';
import { taskIdsByProjectIdState } from 'src/store/entities/projectTask';
import { taskFilesState } from 'src/store/entities/taskFile';

const key = (str: string) => `src/store/app/projectsFiles/${str}`;

export const taskFileIdsState = selectorFamily<string[], string>({
  key: key('taskFileIdsState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const taskFiles = get(taskFilesState);
      const taskIds = get(taskIdsByProjectIdState(projectId));
      return taskFiles
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id);
    },
});
