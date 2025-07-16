import { useColorMode } from '@chakra-ui/color-mode';
import type React from 'react';
import { Button } from 'src/components/ui/atoms';
import { Flex, type FlexProps } from 'src/components/ui/atoms/Flex';
import { Icon } from 'src/components/ui/atoms/Icon';

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
