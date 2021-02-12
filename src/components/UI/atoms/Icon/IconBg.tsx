import React from 'react'
import { Flex, FlexProps } from 'src/components/UI/atoms'
import { transitions } from 'src/styles'

type Props = FlexProps

export const IconBg: React.FC<Props> = (props) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      cursor="pointer"
      p={2}
      _hover={{
        bg: 'navigation.hover',
      }}
      transition={transitions.base}
      {...props}
    />
  )
}
