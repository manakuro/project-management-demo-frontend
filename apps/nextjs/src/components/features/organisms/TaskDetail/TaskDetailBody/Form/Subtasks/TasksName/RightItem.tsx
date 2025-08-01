import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const RightItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex minW={6} justifyContent="center" alignItems="center" {...props} />
  );
});
RightItem.displayName = 'RightItem';
