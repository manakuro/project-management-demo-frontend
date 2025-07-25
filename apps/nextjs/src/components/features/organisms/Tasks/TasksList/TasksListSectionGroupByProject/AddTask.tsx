import type React from 'react';
import { memo, useCallback } from 'react';
import { useTasksTask } from 'src/components/features/organisms/Tasks/hooks';
import { Flex } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';

type Props = {
  taskSectionId: string;
};

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { addTask } = useTasksTask();
  const { clickableHoverStyle } = useClickableHoverStyle();

  const handleClick = useCallback(() => {
    addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, props.taskSectionId]);

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="text.muted"
      pl="68px"
      alignItems="center"
      flex={1}
      {...clickableHoverStyle}
      onClick={handleClick}
    >
      Add task...
    </Flex>
  );
});
AddTask.displayName = 'AddTask';
