import { useMyTasksTasksByTaskSectionId } from 'src/store/app/myTasks/tasks';
import { useProjectsTasksByTaskSectionId } from 'src/store/app/projects/tasks';
import type { Task } from 'src/store/entities/task';
import { useTasksContext } from '../TasksProvider';

type Result = {
  tasks: Task[];
};

export const useTasksTasksByTaskSectionId = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTasksByTaskSectionId(taskSectionId);
  const projects = useProjectsTasksByTaskSectionId(taskSectionId);

  if (isMyTasksPage) {
    return {
      tasks: myTasks.tasks,
    };
  }

  return {
    tasks: projects.tasks,
  };
};
