import { Button } from '@/components/ui/atoms';
import { Flex, type FlexProps } from '@/components/ui/atoms/Flex';
import { Icon } from '@/components/ui/atoms/Icon';
import { useColorMode } from '@chakra-ui/color-mode';
import type React from 'react';

type Props = FlexProps;

export const ColorModeSwitch: React.FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex {...props}>
      <Button onClick={toggleColorMode} variant="ghost">
        <Icon icon={colorMode === 'light' ? 'moon' : 'sun'} />
      </Button>
    </Flex>
  );
};
