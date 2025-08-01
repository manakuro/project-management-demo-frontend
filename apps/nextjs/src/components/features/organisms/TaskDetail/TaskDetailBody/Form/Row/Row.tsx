import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps;

export const Row: React.FC<Props> = (props) => {
  return (
    <Flex minH={9} {...props}>
      {props.children}
    </Flex>
  );
};
