import { atom } from 'jotai';
import { taskIdsByProjectIdState } from 'src/store/entities/projectTask';
import { taskFilesState } from 'src/store/entities/taskFile';

export const taskFileIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByProjectIdState(projectId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
