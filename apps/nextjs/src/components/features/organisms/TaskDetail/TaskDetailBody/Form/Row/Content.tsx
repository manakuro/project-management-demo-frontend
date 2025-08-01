import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps;

export const Content: React.FC<Props> = (props) => {
  return (
    <Flex alignItems="center" flex={1} {...props}>
      {props.children}
    </Flex>
  );
};
