import type React from 'react';
import { memo } from 'react';
import { useSubtaskIds } from 'src/store/entities/task';
import { useSubtaskListContext } from '../Provider';
import { Container } from './Container';

type Props = {
  taskId: string;
};

export const TasksListSubtaskList: React.FC<Props> = memo<Props>((props) => {
  const { isSubtaskExpanded } = useSubtaskListContext();
  const { taskIds } = useSubtaskIds(props.taskId);

  if (!taskIds.length) return null;
  if (!isSubtaskExpanded) return null;

  return <Container subTaskIds={taskIds} taskId={props.taskId} />;
});
TasksListSubtaskList.displayName = 'TasksListSubtaskList';
