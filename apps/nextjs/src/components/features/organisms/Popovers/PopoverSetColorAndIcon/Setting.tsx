import { Checkbox, Flex, Text } from '@/components/ui/atoms';
import type React from 'react';

type Props = {
  isSetForEveryone: boolean;
};

export const Setting: React.FC<Props> = (props) => {
  return (
    <Flex px={6} py={4}>
      <Checkbox defaultChecked={props.isSetForEveryone}>
        <Text fontSize="xs">Set for everyone</Text>
      </Checkbox>
    </Flex>
  );
};
