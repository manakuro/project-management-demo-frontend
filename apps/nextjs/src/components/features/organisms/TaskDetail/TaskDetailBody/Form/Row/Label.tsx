import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps;

export const Label: React.FC<Props> = (props) => {
  return (
    <Flex w="100px" {...props}>
      <Flex h={9} alignItems="center" fontSize="xs" color="text.muted">
        {props.children}
      </Flex>
    </Flex>
  );
};
