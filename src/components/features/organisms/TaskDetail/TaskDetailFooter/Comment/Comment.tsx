import React, { memo } from 'react'
import { MyAvatar } from 'src/components/features/organisms/MyAvatar'
import { Flex } from 'src/components/ui/atoms'
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
