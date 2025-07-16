import type React from 'react';
import { memo } from 'react';
import {
  Icon as AtomsIcon,
  Flex,
  Text,
  type TextProps,
} from 'src/components/ui/atoms';

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
      <AtomsIcon icon="messageRounded" color="primary" ml={1} />
    </Flex>
  );
});
Icon.displayName = 'Icon';
