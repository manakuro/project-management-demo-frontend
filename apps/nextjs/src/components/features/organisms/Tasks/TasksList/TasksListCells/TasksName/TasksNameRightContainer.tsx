import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { useTasksNameContext } from './TasksNameProvider';

type Props = FlexProps;

export const TasksNameRightContainer: React.FC<Props> = memo<Props>((props) => {
  const { showMark } = useTasksNameContext();

  return (
    <Flex
      alignItems="center"
      visibility={showMark ? 'visible' : 'hidden'}
      {...props}
    />
  );
});
TasksNameRightContainer.displayName = 'TasksNameRightContainer';
