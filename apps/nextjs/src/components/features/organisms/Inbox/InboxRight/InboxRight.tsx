import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from '@/shared/chakra';
import type React from 'react';

type Props = FlexProps;

export const InboxRight: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="50%" {...props} ref={ref} />
));

InboxRight.displayName = 'InboxRight';
