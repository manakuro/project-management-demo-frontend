import React from 'react'
import { Flex } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { PADDING_X } from '../ProjectsContainer'

type Props = {}

export const Container: React.FC<Props> = (props) => {
  const { clickableHoverStyle } = useClickableHoverStyle()

  return (
    <Flex
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      py={3}
      px={PADDING_X}
      {...clickableHoverStyle}
    >
      {props.children}
    </Flex>
  )
}
