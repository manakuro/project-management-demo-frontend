import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const OverviewLeftContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" px={4} flexDirection="column" {...props} />;
});

OverviewLeftContent.displayName = 'OverviewLeftContent';
