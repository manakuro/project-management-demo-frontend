import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const InboxHeaderLeft: React.FC<Props> = memo<Props>((props) => {
  return <Flex flex={1} {...props} />;
});
InboxHeaderLeft.displayName = 'InboxHeaderLeft';
