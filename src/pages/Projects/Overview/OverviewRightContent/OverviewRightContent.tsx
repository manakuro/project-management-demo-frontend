import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps;

const maxH = 72;
export const OverviewRightContent: React.FC<Props> = memo((props) => {
  return (
    <Flex
      maxH={`calc(100vh - ${maxH}px)`}
      h="full"
      p={6}
      overflowY="scroll"
      flexDirection="column"
      bg="gray.50"
      {...props}
    />
  );
});

OverviewRightContent.displayName = 'OverviewRightContent';
