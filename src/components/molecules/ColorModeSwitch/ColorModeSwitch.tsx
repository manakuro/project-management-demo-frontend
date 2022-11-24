import { useColorMode } from '@chakra-ui/color-mode'
import React from 'react'
import { Button } from 'src/components/atoms'
import { Flex, FlexProps } from 'src/components/atoms/Flex'
import { Icon } from 'src/components/atoms/Icon'

type Props = FlexProps

export const ColorModeSwitch: React.FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex {...props}>
      <Button onClick={toggleColorMode} variant="ghost">
        <Icon icon={colorMode === 'light' ? 'moon' : 'sun'} />
      </Button>
    </Flex>
  )
}
