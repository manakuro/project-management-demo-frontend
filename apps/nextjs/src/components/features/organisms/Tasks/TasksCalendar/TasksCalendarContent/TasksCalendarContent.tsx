import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMainStyle } from '@/hooks';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

const maxH = 72 + 40 + 24;
export const TasksCalendarContent: React.FC<Props> = memo<Props>((props) => {
  const { maxW } = useMainStyle();

  return (
    <Flex
      flex={1}
      maxW={maxW}
      overflowY="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      minH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.200"
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  );
});
TasksCalendarContent.displayName = 'TasksCalendarContent';
