import React from 'react'
import { Flex } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { PADDING_X } from '../RecentProjects'

type Props = {}

export const Container: React.FC<Props> = (props) => {
  const { clickableHoverStyle } = useClickableHover()

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
