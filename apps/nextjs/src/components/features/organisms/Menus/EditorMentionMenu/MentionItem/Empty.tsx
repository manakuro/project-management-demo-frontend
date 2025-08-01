import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const Empty: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item;

  return (
    <Flex
      fontSize="sm"
      {...styles}
      color="text.muted"
      pointerEvents="none"
      {...props}
    >
      {props.children}
    </Flex>
  );
});
Empty.displayName = 'Empty';
