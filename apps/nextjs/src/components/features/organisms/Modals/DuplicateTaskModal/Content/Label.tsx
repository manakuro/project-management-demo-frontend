import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps;

export const Label: React.FC<Props> = (props) => {
  return (
    <Flex
      color="text.muted"
      fontWeight="medium"
      fontSize="xs"
      mb={2}
      {...props}
    />
  );
};
Label.displayName = 'Label';
