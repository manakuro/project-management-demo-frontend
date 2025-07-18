import type React from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { forwardRef } from 'src/shared/chakra';

type Props = FlexProps;

export const InboxRight: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="50%" {...props} ref={ref} />
));

InboxRight.displayName = 'InboxRight';
