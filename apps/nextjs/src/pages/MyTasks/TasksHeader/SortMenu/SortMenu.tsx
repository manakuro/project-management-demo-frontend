import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { SortMenu as TasksHeaderSortMenu } from 'src/components/features/organisms/Tasks/TasksHeader';
import { useMyTasksContext } from 'src/pages/MyTasks/Provider';
import {
  type TaskListSortStatusCodeValue,
  useMyTasksTaskListStatus,
} from 'src/store/app/myTasks/taskListStatus';
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus';

type Props = {
  projectSortable?: boolean;
};

const ITEMS: {
  value: TaskListSortStatusCodeValue;
  text: string;
}[] = [
  {
    value: TaskListSortStatusCode.None,
    text: 'None',
  },
  {
    value: TaskListSortStatusCode.DueDate,
    text: 'Due Date',
  },
  {
    value: TaskListSortStatusCode.Likes,
    text: 'Likes',
  },
  {
    value: TaskListSortStatusCode.Alphabetical,
    text: 'Alphabetical',
  },
  {
    value: TaskListSortStatusCode.Project,
    text: 'Project',
  },
];

export const SortMenu: React.FC<Props> = memo<Props>((props) => {
  const { sortBy, isSorted, taskListStatus } = useMyTasksTaskListStatus();
  const { startContentLoading, endContentLoading } = useMyTasksContext();

  const handleChange = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      startContentLoading();

      setTimeout(() => {
        sortBy(status);
        endContentLoading();
      }, 200);
    },
    [endContentLoading, sortBy, startContentLoading],
  );
  const projectSortable = useMemo(
    () => props.projectSortable ?? true,
    [props.projectSortable],
  );
  const items = useMemo(() => {
    return ITEMS.filter((i) => {
      if (!projectSortable && i.value === TaskListSortStatusCode.Project)
        return false;
      return true;
    });
  }, [projectSortable]);

  const text = useMemo<string>(() => {
    if (isSorted('none')) return '';
    if (!projectSortable && isSorted('project')) return '';

    return `: ${
      items.find(
        (i) => i.value === taskListStatus.taskListSortStatus.statusCode,
      )?.text
    }`;
  }, [
    isSorted,
    items,
    projectSortable,
    taskListStatus.taskListSortStatus.statusCode,
  ]);

  return (
    <TasksHeaderSortMenu<TaskListSortStatusCodeValue>
      items={items}
      text={text}
      onChange={handleChange}
      defaultValue={
        taskListStatus.taskListSortStatus.statusCode ||
        TaskListSortStatusCode.None
      }
    />
  );
});
SortMenu.displayName = 'SortMenu';
