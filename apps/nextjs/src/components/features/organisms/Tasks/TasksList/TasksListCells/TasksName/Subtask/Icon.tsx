import {
  Icon as AtomsIcon,
  Flex,
  Text,
  type TextProps,
} from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = {
  size: number;
  textStyle?: TextProps;
};

export const Icon: React.FC<Props> = memo<Props>((props) => {
  const { size, textStyle } = props;

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="primary" {...textStyle}>
        {size}
      </Text>
      <AtomsIcon icon="flowChildren" color="primary" ml={1} />
    </Flex>
  );
});
Icon.displayName = 'Icon';
