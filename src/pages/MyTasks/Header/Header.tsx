import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/atoms'
import { ShareButton } from './ShareButton'
import { Tabs } from './Tabs'
import { Avatar } from './Avatar'

export const Header: React.VFC = memo(() => {
  return (
    <Flex flex={1}>
      <Avatar />
      <Tabs />
      <ShareButton />
      <Flex mx={3} my={4}>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  )
})
