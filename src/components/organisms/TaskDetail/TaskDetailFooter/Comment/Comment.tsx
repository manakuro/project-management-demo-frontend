import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { MyAvatar } from 'src/components/organisms/MyAvatar'
import { Input } from './Input'

type Props = {}

export const Comment: React.FC<Props> = memo(() => {
  return (
    <Flex flex={1}>
      <Flex alignItems="center" h={9}>
        <MyAvatar size="xs" />
      </Flex>
      <Input />
    </Flex>
  )
})
Comment.displayName = 'Comment'
