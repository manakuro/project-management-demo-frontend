import type React from 'react';
import { memo } from 'react';
import { useTasksContext } from 'src/components/features/organisms/Tasks';
import { Container } from './Container';
import { Empty } from './Empty';

type Props = {
  taskId: string;
};

export const ExpandIcon: React.FC<Props> = memo<Props>((props) => {
  const { isProjectsPage } = useTasksContext();

  if (isProjectsPage) {
    return <Container taskId={props.taskId} />;
  }

  return <Empty />;
});
ExpandIcon.displayName = 'ExpandIcon';
