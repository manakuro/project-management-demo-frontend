import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useLinkHover } from 'src/hooks/useLinkHover'
import { useClickableHover } from 'src/hooks'

type Props = FlexProps & {
  dark?: boolean
}

export const IconBg: React.FC<Props> = (props) => {
  const { dark, ...rest } = props
  const { clickableHoverStyle } = useClickableHover()
  const { _hover } = useLinkHover()
  const style = dark
    ? { _hover }
    : { ...clickableHoverStyle, _hover: { bg: 'gray.100' } }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      borderRadius="md"
      cursor="pointer"
      p={2}
      transition={transitions.base}
      {...style}
      {...rest}
    />
  )
}
