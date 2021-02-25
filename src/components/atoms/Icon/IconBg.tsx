import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useLinkHover } from 'src/hooks/useLinkHover'

type Props = FlexProps

export const IconBg: React.FC<Props> = (props) => {
  const { _hover } = useLinkHover()

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      cursor="pointer"
      p={2}
      _hover={_hover}
      transition={transitions.base}
      {...props}
    />
  )
}
