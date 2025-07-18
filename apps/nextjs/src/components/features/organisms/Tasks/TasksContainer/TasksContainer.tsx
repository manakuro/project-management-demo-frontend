import type React from 'react';
import { type PropsWithChildren, memo } from 'react';
import { TasksModals } from '../TasksModals';
import { TasksProvider, type TasksProviderProps } from '../TasksProvider';

type Props = PropsWithChildren<TasksProviderProps>;

export const TasksContainer: React.FC<Props> = memo<Props>((props) => {
  const { isMyTasksPage, isProjectsPage } = props;
  return (
    <TasksProvider
      isMyTasksPage={isMyTasksPage}
      isProjectsPage={isProjectsPage}
    >
      <TasksModals />
      {props.children}
    </TasksProvider>
  );
});
TasksContainer.displayName = 'TasksContainer';
