import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';

type Props = FlexProps;

export const OverviewRight: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="672px" maxW="672px" flexDirection="column" {...props} ref={ref} />
));

OverviewRight.displayName = 'OverviewRight';
