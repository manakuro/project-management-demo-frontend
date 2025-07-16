import { useMyTasksTaskIdsByDueDate } from 'src/store/app/myTasks/tasks';
import { useProjectsTaskIdsByDueDate } from 'src/store/app/projects/tasks';
import { useTasksContext } from '../TasksProvider';

type Result = {
  taskIds: string[];
};

export const useTasksTaskIdsByDueDate = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskIdsByDueDate(dueDate);
  const projects = useProjectsTaskIdsByDueDate(dueDate);

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    };
  }

  return {
    taskIds: projects.taskIds,
  };
};
