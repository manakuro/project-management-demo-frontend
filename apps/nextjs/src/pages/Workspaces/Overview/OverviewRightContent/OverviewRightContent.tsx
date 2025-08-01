import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const OverviewRightContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" flexDirection="column" {...props} />;
});

OverviewRightContent.displayName = 'OverviewRightContent';
