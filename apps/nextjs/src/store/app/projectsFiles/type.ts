import type { TaskFile } from 'src/store/entities/taskFile';

export type ProjectsFileResponse = TaskFile & {
  task: Task;
};

export type Task = {
  id: string;
  name: string;
};
