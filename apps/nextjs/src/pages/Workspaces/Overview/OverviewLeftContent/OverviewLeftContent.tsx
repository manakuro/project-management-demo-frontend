import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps;

export const OverviewLeftContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" px={4} flexDirection="column" {...props} />;
});

OverviewLeftContent.displayName = 'OverviewLeftContent';
