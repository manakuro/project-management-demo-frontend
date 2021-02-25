import React from 'react'
import { Flex, Link, NextLink, Text, Icon } from 'src/components/atoms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'

type Props = {}

export const Workspace: React.VFC<Props> = () => {
  const { _hover } = useLinkHover()
  const clickableStyle = useClickableHover()

  return (
    <NextLink href="home" passHref>
      <Link p={2} px={PADDING_X} _hover={_hover}>
        <Flex alignItems="center">
          <Text fontSize="sm" flex={1}>
            Workspace
          </Text>
          <Icon icon="plus" {...clickableStyle} />
        </Flex>
      </Link>
    </NextLink>
  )
}
