import { Flex, Icon, Text } from '@/components/ui/atoms';
import { useSubtaskIds } from '@/store/entities/task';
import type React from 'react';
import { useMemo } from 'react';

type Props = {
  taskId: string;
};

export const Subtask: React.FC<Props> = (props) => {
  const { taskId } = props;
  const { taskIds } = useSubtaskIds(taskId);
  const size = useMemo(() => taskIds.length, [taskIds.length]);

  if (!size) return null;

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="inherit">
        {size}
      </Text>
      <Icon icon="flowChildren" color="inherit" />
    </Flex>
  );
};
