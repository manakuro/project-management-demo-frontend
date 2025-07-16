import { memo } from 'react';
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell';
import { useTasksListHeaderContext } from '../Provider';

export const RemainingSpace = memo(function RemainingSpace() {
  const { sortedStyle } = useTasksListHeaderContext();

  return (
    <TasksListCell
      containerStyle={{ flex: 1 }}
      borderRight="none"
      {...sortedStyle}
    />
  );
});
