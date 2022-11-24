import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { MyAvatar } from 'src/components/organisms/MyAvatar'

export const Avatar: React.FC = memo(() => {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  )
})
Avatar.displayName = 'Avatar'
