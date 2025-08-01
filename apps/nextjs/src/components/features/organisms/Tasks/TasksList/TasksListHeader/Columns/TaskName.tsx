import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import type React from 'react';
import { memo } from 'react';
import { Container } from './Container';

type Props = {
  tasksTaskColumnId: string;
};

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props;
  const { stickyStyle } = useTasksListContext();

  return (
    <Container
      ml={6}
      tasksTaskColumnId={tasksTaskColumnId}
      isFirst
      containerStyle={{ ...stickyStyle }}
    />
  );
});
TaskName.displayName = 'TaskName';
