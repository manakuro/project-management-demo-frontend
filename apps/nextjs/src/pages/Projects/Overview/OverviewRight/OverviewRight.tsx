import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';

type Props = FlexProps;

export const OverviewRight: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="400px" maxW="400px" flexDirection="column" {...props} ref={ref} />
));

OverviewRight.displayName = 'OverviewRight';
