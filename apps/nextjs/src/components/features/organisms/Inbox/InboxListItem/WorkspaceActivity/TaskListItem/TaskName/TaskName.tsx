import { Text, type TextProps } from '@/components/ui/atoms';
import { useTask } from '@/store/entities/task';
import type React from 'react';
import { memo, useMemo } from 'react';

type Props = {
  taskId: string;
  isTransitioning: boolean;
} & TextProps;

export const TaskName: React.FC<Props> = memo((props) => {
  const { taskId, isTransitioning, ...rest } = props;
  const { task } = useTask(taskId);
  const style = useMemo(
    (): TextProps => ({
      ...(isTransitioning ? { color: 'white' } : {}),
    }),
    [isTransitioning],
  );

  return (
    <Text
      noOfLines={1}
      fontSize="sm"
      ml={2}
      width="60%"
      // TODO: text will be selected when clicking icon button, so currently disable selection
      _selection={{ bg: 'none' }}
      {...style}
      {...rest}
    >
      {task.name}
    </Text>
  );
});
TaskName.displayName = 'TaskName';
