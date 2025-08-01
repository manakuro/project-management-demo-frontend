import { useTaskActivityTaskIds } from '@/components/features/organisms/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { TaskListItem } from '../TaskListItem';

type Props = FlexProps & {
  taskActivityId: string;
};

export const TaskList: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props;
  const { taskIds } = useTaskActivityTaskIds(taskActivityId);

  return (
    <Flex flex={1} mt={4} flexDirection="column">
      {taskIds.map((id, i) => (
        <TaskListItem
          taskId={id}
          key={id}
          isFirst={i === 0}
          isLast={taskIds.length - 1 === i}
        />
      ))}
    </Flex>
  );
});

TaskList.displayName = 'TaskList';
