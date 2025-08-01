import { useTasksContext } from '@/components/features/organisms/Tasks';
import type { FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { ListItemForMyTasksPage } from './ListItemForMyTasksPage';
import { ListItemForProjectsPage } from './ListItemForProjectsPage';

type Props = {
  taskId: string;
} & FlexProps;

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props;
  const { isMyTasksPage } = useTasksContext();

  if (isMyTasksPage) {
    return <ListItemForMyTasksPage taskId={taskId} />;
  }

  return <ListItemForProjectsPage taskId={taskId} />;
});
ListItem.displayName = 'ListItem';
