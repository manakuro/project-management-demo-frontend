import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps;

export const OverviewRightContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" flexDirection="column" {...props} />;
});

OverviewRightContent.displayName = 'OverviewRightContent';
