import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';

type Props = FlexProps;

export const OverviewLeft: React.FC<Props> = forwardRef((props, ref) => (
  <Flex flex={1} flexDirection="column" {...props} ref={ref} />
));

OverviewLeft.displayName = 'OverviewLeft';
