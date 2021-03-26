import React, { memo } from 'react'
import { Avatar, Divider, Flex } from 'src/components/atoms'
import { ShareButton } from './ShareButton'
import { Tabs } from './Tabs'

export const Header: React.VFC = memo(() => {
  return (
    <Flex flex={1}>
      <Flex alignItems="center">
        <Avatar name="Manato Kuroda" src="/images/cat_img.png" />
      </Flex>
      <Tabs />
      <ShareButton />
      <Flex mx={3} my={4}>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  )
})
