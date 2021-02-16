import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms/Flex'
import { Icon } from 'src/components/atoms/Icon'
import { Button } from 'src/components/atoms'
import { useColorMode } from '@chakra-ui/color-mode'

type Props = FlexProps

export const ColorModeSwitch: React.VFC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex {...props}>
      <Button onClick={toggleColorMode} variant="ghost">
        <Icon icon={colorMode === 'light' ? 'moon' : 'sun'} />
      </Button>
    </Flex>
  )
}
