import React, { memo } from 'react'
import { MyAvatar } from 'src/components/features/organisms/MyAvatar'
import { Flex } from 'src/components/ui/atoms'

export const Avatar: React.FC = memo(() => {
  return (
    <Flex alignItems="center">
      <MyAvatar />
    </Flex>
  )
})
Avatar.displayName = 'Avatar'
